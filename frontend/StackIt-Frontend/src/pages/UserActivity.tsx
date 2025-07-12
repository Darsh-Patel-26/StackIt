import React, { useState } from 'react';
import { Calendar, MessageCircle, ThumbsUp, Award, TrendingUp, Filter, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const UserActivity: React.FC = () => {
  const { user, activities, permissions } = useAuth();
  const [filterType, setFilterType] = useState<'all' | 'questions' | 'answers' | 'votes' | 'badges'>('all');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
          <p className="text-gray-600">You need to be logged in to view your activity.</p>
        </div>
      </div>
    );
  }

  const filteredActivities = activities.filter(activity => {
    if (filterType === 'all') return true;
    if (filterType === 'questions') return activity.type === 'question_posted';
    if (filterType === 'answers') return activity.type === 'answer_posted';
    if (filterType === 'votes') return activity.type === 'vote_cast';
    if (filterType === 'badges') return activity.type === 'badge_earned';
    return true;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'question_posted': return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'answer_posted': return <MessageCircle className="w-5 h-5 text-green-600" />;
      case 'comment_posted': return <MessageCircle className="w-5 h-5 text-purple-600" />;
      case 'vote_cast': return <ThumbsUp className="w-5 h-5 text-orange-600" />;
      case 'answer_accepted': return <Award className="w-5 h-5 text-yellow-600" />;
      case 'badge_earned': return <Award className="w-5 h-5 text-yellow-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'question_posted': return 'bg-blue-50 border-blue-200';
      case 'answer_posted': return 'bg-green-50 border-green-200';
      case 'comment_posted': return 'bg-purple-50 border-purple-200';
      case 'vote_cast': return 'bg-orange-50 border-orange-200';
      case 'answer_accepted': return 'bg-yellow-50 border-yellow-200';
      case 'badge_earned': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Activity</h1>
        <p className="text-gray-600">Track your contributions and engagement on StackIt</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Questions Asked</p>
              <p className="text-2xl font-bold text-gray-900">{user.stats.questionsAsked}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Answers Given</p>
              <p className="text-2xl font-bold text-gray-900">{user.stats.answersGiven}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Award className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Accepted Answers</p>
              <p className="text-2xl font-bold text-gray-900">{user.stats.acceptedAnswers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Reputation</p>
              <p className="text-2xl font-bold text-gray-900">{user.reputation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      {user.badges.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Your Badges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.badges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{badge.name}</div>
                  <div className="text-sm text-gray-600">{badge.description}</div>
                  <div className="text-xs text-gray-500">
                    Earned {formatDistanceToNow(badge.earnedAt, { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All Activity' },
              { key: 'questions', label: 'Questions' },
              { key: 'answers', label: 'Answers' },
              { key: 'votes', label: 'Votes' },
              { key: 'badges', label: 'Badges' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterType(filter.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === filter.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        
        {filteredActivities.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${getActivityColor(activity.type)} border-l-4`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDistanceToNow(activity.createdAt, { addSuffix: true })}</span>
                      </div>
                      {activity.metadata.questionId && (
                        <span className="text-blue-600">Question #{activity.metadata.questionId.slice(-4)}</span>
                      )}
                      {activity.metadata.voteType && (
                        <span className={`${activity.metadata.voteType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {activity.metadata.voteType === 'up' ? '👍' : '👎'} Vote
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Yet</h3>
            <p className="text-gray-600">
              {filterType === 'all' 
                ? "Start participating in the community to see your activity here!"
                : `No ${filterType} activity found. Try a different filter.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserActivity;