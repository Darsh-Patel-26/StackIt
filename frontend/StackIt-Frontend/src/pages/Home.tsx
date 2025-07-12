import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MessageCircle, Trophy, Zap, TrendingUp, Star, Award, BookOpen } from 'lucide-react';
import QuestionCard from '../components/Questions/QuestionCard';
import { mockQuestions } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: 'Ask & Answer',
      description: 'Post questions and get expert answers from the community',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of developers helping each other grow',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Trophy,
      title: 'Reputation System',
      description: 'Build your reputation by providing quality answers',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Zap,
      title: 'Rich Text Editor',
      description: 'Format your posts with our powerful rich text editor',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { label: 'Questions', value: '10.2K+', icon: BookOpen },
    { label: 'Answers', value: '25.8K+', icon: MessageCircle },
    { label: 'Users', value: '5.4K+', icon: Users },
    { label: 'Experts', value: '1.2K+', icon: Award }
  ];

  const AnimatedCounter: React.FC<{ value: string; delay: number }> = ({ value, delay }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.replace(/[^\d]/g, ''));

    useEffect(() => {
      if (!isVisible) return;
      
      const timer = setTimeout(() => {
        let start = 0;
        const increment = numericValue / 50;
        const counter = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(counter);
          } else {
            setCount(Math.floor(start));
          }
        }, 30);
        
        return () => clearInterval(counter);
      }, delay);

      return () => clearTimeout(timer);
    }, [isVisible, numericValue, delay]);

    return (
      <span className="text-3xl md:text-4xl font-bold text-gray-900">
        {count}{value.replace(/[\d]/g, '').replace('.', '')}
      </span>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section */}
        <div className="relative">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-bounce">
                <Star className="w-4 h-4 mr-2" />
                Join the Developer Community
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Where{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
                  Developers
                </span>{' '}
                <br className="hidden sm:block" />
                Learn Together
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                StackIt is the collaborative Q&A platform where developers help each other solve problems, 
                share knowledge, and build amazing things together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  to="/register"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 font-semibold text-lg flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/questions"
                  className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 font-semibold text-lg flex items-center justify-center"
                >
                  <BookOpen className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Browse Questions
                </Link>
              </div>

              {/* Floating Cards Animation */}
              <div className="relative mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { title: "Ask Questions", icon: "❓", delay: "0s" },
                    { title: "Get Answers", icon: "💡", delay: "0.5s" },
                    { title: "Build Reputation", icon: "🏆", delay: "1s" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
                      style={{ animationDelay: item.delay }}
                    >
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`bg-white/80 backdrop-blur-sm py-16 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <stat.icon className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <AnimatedCounter value={stat.value} delay={index * 200} />
                  <div className="text-gray-600 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={`py-20 bg-gradient-to-b from-white/80 to-gray-50/80 backdrop-blur-sm transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose StackIt?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to ask questions, share knowledge, and grow as a developer
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-20 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Start asking questions, sharing knowledge, and connecting with developers worldwide
            </p>
            <Link
              to="/register"
              className="group bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-bold text-lg inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Sign Up Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes gradient {
            0%, 100% {
              background-size: 200% 200%;
              background-position: left center;
            }
            50% {
              background-size: 200% 200%;
              background-position: right center;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Authenticated user view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.username}! 👋
                </h1>
                <p className="text-gray-600 mb-4">
                  Ready to help the community or ask a question?
                </p>
                <Link
                  to="/ask"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 inline-flex items-center shadow-sm hover:shadow-md"
                >
                  Ask a Question
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
            <Link
              to="/questions"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {mockQuestions.slice(0, 5).map((question, index) => (
              <div 
                key={question.id}
                className="animate-in slide-in-from-bottom duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <QuestionCard question={question} />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Your Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reputation</span>
                <span className="font-bold text-blue-600 text-lg">{user.reputation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Questions Asked</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Answers Given</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Best Answers</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-500" />
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {['react', 'javascript', 'typescript', 'node.js', 'python', 'css'].map((tag) => (
                <Link
                  key={tag}
                  to={`/questions?tag=${tag}`}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-blue-100 hover:text-blue-800 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
              Recent Activity
            </h3>
            <div className="space-y-3 text-sm">
              <div className="text-gray-600">
                <span className="font-medium">sarah_dev</span> answered your question
                <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
              </div>
              <div className="text-gray-600">
                Your answer was accepted
                <div className="text-xs text-gray-500 mt-1">1 day ago</div>
              </div>
              <div className="text-gray-600">
                <span className="font-medium">mike_tech</span> upvoted your answer
                <div className="text-xs text-gray-500 mt-1">2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;