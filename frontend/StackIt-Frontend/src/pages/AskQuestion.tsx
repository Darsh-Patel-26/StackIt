import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, HelpCircle, AlertCircle } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor/RichTextEditor';
import TagInput from '../components/Questions/TagInput';
import { useAuth } from '../contexts/AuthContext';

const AskQuestion: React.FC = () => {
  const { user, permissions, updateUserStats, addActivity, addNotification } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!permissions.canPostQuestions) {
      navigate('/');
    }
  }, [user, permissions, navigate]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    } else if (title.trim().length > 150) {
      newErrors.title = 'Title must be less than 150 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 30) {
      newErrors.description = 'Description must be at least 30 characters long';
    }

    if (tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    } else if (tags.length > 5) {
      newErrors.tags = 'Maximum 5 tags allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      const questionData = {
        title: title.trim(),
        description: description.trim(),
        tags,
        author: user!
      };
      
      console.log('Submitting question:', questionData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user stats
      updateUserStats('questionsAsked');
      
      // Add activity
      addActivity({
        type: 'question_posted',
        description: `Posted a new question: "${title.trim()}"`,
        metadata: {
          questionId: 'new-question-id' // This would come from the API response
        }
      });

      // Check for first question badge
      if (user!.stats.questionsAsked === 0) {
        addNotification({
          type: 'badge',
          message: 'Congratulations! You earned the "Curious" badge for asking your first question!',
          isRead: false,
          triggeredBy: user!,
          recipient: user!.id
        });
      }
      
      navigate('/questions');
    } catch (error) {
      console.error('Failed to submit question:', error);
      alert('Failed to submit question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !permissions.canPostQuestions) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Question</h1>
          <p className="text-gray-600">
            Be specific and imagine you're asking a question to another person
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
              <span className="text-gray-500 font-normal ml-2">
                Be specific and imagine you're asking a question to another person
              </span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors(prev => ({ ...prev, title: '' }));
                }
              }}
              placeholder="e.g. How to center a div using CSS flexbox?"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              maxLength={150}
            />
            {errors.title && (
              <div className="mt-2 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.title}
              </div>
            )}
            <div className="mt-1 text-xs text-gray-500">
              {title.length}/150 characters
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Description *
                <span className="text-gray-500 font-normal ml-2">
                  Include all the information someone would need to answer your question
                </span>
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <Eye className="w-4 h-4" />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </button>
            </div>
            
            {showPreview ? (
              <div className={`border rounded-lg p-4 min-h-[200px] bg-gray-50 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}>
                <div dangerouslySetInnerHTML={{ 
                  __html: description || '<p class="text-gray-500">Nothing to preview yet...</p>' 
                }} />
              </div>
            ) : (
              <div className={errors.description ? 'ring-2 ring-red-200 rounded-lg' : ''}>
                <RichTextEditor
                  value={description}
                  onChange={(value) => {
                    setDescription(value);
                    if (errors.description) {
                      setErrors(prev => ({ ...prev, description: '' }));
                    }
                  }}
                  placeholder="Describe your problem in detail. Include any code snippets, error messages, or examples that might help others understand your question."
                  height="300px"
                />
              </div>
            )}
            {errors.description && (
              <div className="mt-2 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.description}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags *
              <span className="text-gray-500 font-normal ml-2">
                Add up to 5 tags to describe what your question is about
              </span>
            </label>
            <TagInput
              tags={tags}
              onChange={(newTags) => {
                setTags(newTags);
                if (errors.tags) {
                  setErrors(prev => ({ ...prev, tags: '' }));
                }
              }}
              placeholder="e.g. react, javascript, css"
            />
            {errors.tags && (
              <div className="mt-2 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.tags}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Tips for asking a great question:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Make your title specific and descriptive</li>
                  <li>• Include relevant code snippets and error messages</li>
                  <li>• Explain what you've already tried</li>
                  <li>• Use proper tags to help others find your question</li>
                  <li>• Be respectful and courteous</li>
                  <li>• Proofread your question before posting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{isSubmitting ? 'Posting...' : 'Post Your Question'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/questions')}
              className="text-gray-600 hover:text-gray-900 px-4 py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;