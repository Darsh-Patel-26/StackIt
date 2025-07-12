import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search } from 'lucide-react';
import QuestionCard from '../components/Questions/QuestionCard';
import { mockQuestions } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Questions: React.FC = () => {
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState<'newest' | 'votes' | 'views'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'unanswered' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = mockQuestions
    .filter(question => {
      if (filterBy === 'unanswered') return question.answers.length === 0;
      if (filterBy === 'resolved') return question.isResolved;
      return true;
    })
    .filter(question => 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'votes': return b.votes - a.votes;
        case 'views': return b.views - a.views;
        case 'newest':
        default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
          <p className="text-gray-600 mt-2">{mockQuestions.length} questions</p>
        </div>
        {user && (
          <Link
            to="/ask"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Ask Question</span>
          </Link>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'votes' | 'views')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="votes">Most Votes</option>
              <option value="views">Most Views</option>
            </select>
          </div>

          {/* Filter By */}
          <div className="flex space-x-2">
            {(['all', 'unanswered', 'resolved'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterBy(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterBy === filter
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters, or be the first to ask a question!
            </p>
            {user && (
              <Link
                to="/ask"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Ask Question</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;