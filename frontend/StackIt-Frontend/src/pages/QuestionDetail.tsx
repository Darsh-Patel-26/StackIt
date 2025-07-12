import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, MessageCircle, Check, Flag, Edit, Eye, Calendar, User, Award } from 'lucide-react';
import { mockQuestions, mockUsers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import RichTextEditor from '../components/RichTextEditor/RichTextEditor';
import { formatDistanceToNow } from 'date-fns';

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, permissions, updateUserStats, addActivity, addNotification } = useAuth();
  const [newAnswer, setNewAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVotes, setUserVotes] = useState<{[key: string]: 'up' | 'down' | null}>({});

  const question = mockQuestions.find(q => q.id === id);

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Question Not Found</h1>
          <p className="text-gray-600 mb-6">The question you're looking for doesn't exist.</p>
          <Link
            to="/questions"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Questions
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim() || !user) return;

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      console.log('Submitting answer:', newAnswer);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user stats
      updateUserStats('answersGiven');
      
      // Add activity
      addActivity({
        type: 'answer_posted',
        description: `Answered the question: "${question.title}"`,
        metadata: {
          questionId: question.id,
          answerId: 'new-answer-id'
        }
      });

      // Notify question author
      if (question.author.id !== user.id) {
        addNotification({
          type: 'answer',
          message: `${user.username} answered your question: "${question.title}"`,
          isRead: false,
          questionId: question.id,
          answerId: 'new-answer-id',
          triggeredBy: user,
          recipient: question.author.id
        });
      }
      
      setNewAnswer('');
      alert('Answer submitted successfully!');
    } catch (error) {
      console.error('Failed to submit answer:', error);
      alert('Failed to submit answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = (type: 'up' | 'down', targetId: string, targetType: 'question' | 'answer') => {
    if (!user || !permissions.canVote) {
      alert('Please sign in to vote');
      return;
    }

    const currentVote = userVotes[targetId];
    let newVote: 'up' | 'down' | null = type;
    
    // If clicking the same vote type, remove the vote
    if (currentVote === type) {
      newVote = null;
    }

    setUserVotes(prev => ({
      ...prev,
      [targetId]: newVote
    }));

    // Update user stats
    updateUserStats('totalVotes');

    // Add activity
    addActivity({
      type: 'vote_cast',
      description: `${newVote ? 'Voted' : 'Removed vote on'} ${targetType}: "${question.title}"`,
      metadata: {
        questionId: targetType === 'question' ? targetId : question.id,
        answerId: targetType === 'answer' ? targetId : undefined,
        voteType: newVote || undefined
      }
    });

    console.log('Vote:', { type: newVote, targetId, targetType });
  };

  const handleAcceptAnswer = (answerId: string) => {
    if (!user || user.id !== question.author.id) {
      alert('Only the question author can accept answers');
      return;
    }

    // Find the answer author
    const answer = question.answers.find(a => a.id === answerId);
    if (!answer) return;

    // Add activity
    addActivity({
      type: 'answer_accepted',
      description: `Accepted an answer for: "${question.title}"`,
      metadata: {
        questionId: question.id,
        answerId
      }
    });

    // Notify answer author
    if (answer.author.id !== user.id) {
      addNotification({
        type: 'acceptance',
        message: `Your answer was accepted for: "${question.title}"`,
        isRead: false,
        questionId: question.id,
        answerId,
        triggeredBy: user,
        recipient: answer.author.id
      });
    }

    console.log('Accept answer:', answerId);
  };

  const getVoteButtonClass = (voteType: 'up' | 'down', targetId: string) => {
    const userVote = userVotes[targetId];
    const isActive = userVote === voteType;
    
    if (voteType === 'up') {
      return `p-2 rounded-lg transition-colors ${
        isActive 
          ? 'text-green-600 bg-green-50' 
          : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
      }`;
    } else {
      return `p-2 rounded-lg transition-colors ${
        isActive 
          ? 'text-red-600 bg-red-50' 
          : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
      }`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Question Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
        
        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Asked {formatDistanceToNow(question.createdAt, { addSuffix: true })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>Viewed {question.views} times</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{question.answers.length} answers</span>
          </div>
          {question.isResolved && (
            <div className="flex items-center space-x-1 text-green-600">
              <Check className="w-4 h-4" />
              <span>Resolved</span>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Vote Section */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => handleVote('up', question.id, 'question')}
              className={getVoteButtonClass('up', question.id)}
              disabled={!permissions.canVote}
            >
              <ArrowUp className="w-6 h-6" />
            </button>
            <span className="text-xl font-bold text-gray-900">{question.votes}</span>
            <button
              onClick={() => handleVote('down', question.id, 'question')}
              className={getVoteButtonClass('down', question.id)}
              disabled={!permissions.canVote}
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <div 
              className="prose max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: question.description }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {question.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/questions?tag=${tag}`}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md hover:bg-blue-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={question.author.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={question.author.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <Link
                    to={`/profile/${question.author.username}`}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {question.author.username}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Award className="w-3 h-3" />
                    <span>{question.author.reputation} reputation</span>
                    {question.author.role === 'admin' && (
                      <span className="text-purple-600 font-medium">Admin</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {user && user.id === question.author.id && (
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg">
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
        </h2>

        <div className="space-y-6">
          {question.answers.map((answer) => (
            <div
              key={answer.id}
              className={`bg-white rounded-lg shadow-sm border p-8 ${
                answer.isAccepted ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex gap-6">
                {/* Vote Section */}
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => handleVote('up', answer.id, 'answer')}
                    className={getVoteButtonClass('up', answer.id)}
                    disabled={!permissions.canVote}
                  >
                    <ArrowUp className="w-6 h-6" />
                  </button>
                  <span className="text-xl font-bold text-gray-900">{answer.votes}</span>
                  <button
                    onClick={() => handleVote('down', answer.id, 'answer')}
                    className={getVoteButtonClass('down', answer.id)}
                    disabled={!permissions.canVote}
                  >
                    <ArrowDown className="w-6 h-6" />
                  </button>
                  
                  {user && user.id === question.author.id && !answer.isAccepted && (
                    <button
                      onClick={() => handleAcceptAnswer(answer.id)}
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Accept this answer"
                    >
                      <Check className="w-6 h-6" />
                    </button>
                  )}
                  
                  {answer.isAccepted && (
                    <div className="p-2 text-green-600 bg-green-100 rounded-lg">
                      <Check className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Answer Content */}
                <div className="flex-1">
                  {answer.isAccepted && (
                    <div className="mb-4 flex items-center space-x-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">Accepted Answer</span>
                    </div>
                  )}

                  <div 
                    className="prose max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: answer.content }}
                  />

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={answer.author.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={answer.author.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <Link
                          to={`/profile/${answer.author.username}`}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          {answer.author.username}
                        </Link>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{formatDistanceToNow(answer.createdAt, { addSuffix: true })}</span>
                          <Award className="w-3 h-3" />
                          <span>{answer.author.reputation} reputation</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {user && user.id === answer.author.id && (
                        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg">
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      {user && permissions.canPostAnswers ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Answer</h3>
          <form onSubmit={handleAnswerSubmit}>
            <div className="mb-6">
              <RichTextEditor
                value={newAnswer}
                onChange={setNewAnswer}
                placeholder="Write your answer here. Be specific and provide detailed explanations or code examples."
                height="250px"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newAnswer.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post Your Answer'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Want to answer this question?</h3>
          <p className="text-gray-600 mb-4">
            {!user 
              ? 'Sign in to post your answer and help the community.'
              : 'You need to be a registered user to post answers.'
            }
          </p>
          {!user && (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 px-6 py-3 inline-block"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;