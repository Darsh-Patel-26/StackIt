import { Question, User, Answer, Notification, Badge } from '../types';

// 🔹 Reusable badge objects
const badgeReactPro: Badge = {
  id: 'badge1',
  name: 'React Pro',
  description: 'Expert in React.js',
  icon: '⚛️',
  color: '#61dafb',
  earnedAt: new Date('2023-05-10')
};

const badgeTypeScriptLover: Badge = {
  id: 'badge2',
  name: 'TypeScript Lover',
  description: 'Consistently uses TypeScript',
  icon: '🧠',
  color: '#3178c6',
  earnedAt: new Date('2023-06-15')
};

const badgeHelpfulUser: Badge = {
  id: 'badge3',
  name: 'Helpful User',
  description: 'Provided helpful answers',
  icon: '🤝',
  color: '#4caf50',
  earnedAt: new Date('2023-07-01')
};

const badgeAdmin: Badge = {
  id: 'badge4',
  name: 'Admin',
  description: 'Platform administrator',
  icon: '🛡️',
  color: '#ff5722',
  earnedAt: new Date('2022-01-01')
};

const badgeVeteran: Badge = {
  id: 'badge5',
  name: 'Veteran',
  description: '1+ year active',
  icon: '🎖️',
  color: '#9c27b0',
  earnedAt: new Date('2023-01-01')
};

// 🔹 Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'sarah_dev',
    email: 'sarah@example.com',
    role: 'user',
    reputation: 1250,
    joinedAt: new Date('2023-01-15'),
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    lastSeen: new Date('2024-07-11T18:00:00'),
    badges: [badgeReactPro, badgeTypeScriptLover],
    stats: {
      questionsAsked: 5,
      answersGiven: 12,
      acceptedAnswers: 6,
      totalVotes: 100,
      helpfulVotes: 80,
      commentsPosted: 22
    }
  },
  {
    id: '2',
    username: 'mike_tech',
    email: 'mike@example.com',
    role: 'user',
    reputation: 890,
    joinedAt: new Date('2023-03-20'),
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    lastSeen: new Date('2024-07-11T19:00:00'),
    badges: [badgeHelpfulUser],
    stats: {
      questionsAsked: 3,
      answersGiven: 9,
      acceptedAnswers: 2,
      totalVotes: 55,
      helpfulVotes: 40,
      commentsPosted: 17
    }
  },
  {
    id: '3',
    username: 'admin_alex',
    email: 'alex@stackit.com',
    role: 'admin',
    reputation: 5000,
    joinedAt: new Date('2022-06-10'),
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    isActive: true,
    lastSeen: new Date('2024-07-11T20:00:00'),
    badges: [badgeAdmin, badgeVeteran],
    stats: {
      questionsAsked: 10,
      answersGiven: 25,
      acceptedAnswers: 15,
      totalVotes: 300,
      helpfulVotes: 250,
      commentsPosted: 50
    }
  }
];

// 🔹 Answers
export const mockAnswers: Answer[] = [
  {
    id: 'ans1',
    content: '<p>You can use <strong>useState</strong>...</p>',
    author: mockUsers[1],
    questionId: 'q1',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    votes: 15,
    isAccepted: true,
    comments: [],
    mentions: ['1']
  },
  {
    id: 'ans2',
    content: '<p>Another approach is to use <em>useReducer</em>...</p>',
    author: mockUsers[0],
    questionId: 'q1',
    createdAt: new Date('2024-01-15T11:15:00'),
    updatedAt: new Date('2024-01-15T11:15:00'),
    votes: 8,
    isAccepted: false,
    comments: [],
    mentions: []
  }
];

// 🔹 Questions
export const mockQuestions: Question[] = [
  {
    id: 'q1',
    title: 'How to manage state in React components?',
    description: '<p>I\'m new to React...</p>',
    tags: ['react', 'javascript', 'state-management'],
    author: mockUsers[0],
    createdAt: new Date('2024-01-15T09:00:00'),
    updatedAt: new Date('2024-01-15T11:15:00'),
    votes: 12,
    answers: mockAnswers,
    views: 156,
    isResolved: true,
    acceptedAnswerId: 'ans1',
    watchers: ['2'],
    lastActivity: new Date('2024-01-15T11:15:00')
  },
  {
    id: 'q2',
    title: 'JWT token expiration handling best practices',
    description: '<p>What are the best practices...</p>',
    tags: ['jwt', 'authentication', 'security', 'react'],
    author: mockUsers[1],
    createdAt: new Date('2024-01-14T14:22:00'),
    updatedAt: new Date('2024-01-14T14:22:00'),
    votes: 8,
    answers: [],
    views: 89,
    isResolved: false,
    acceptedAnswerId: undefined,
    watchers: [],
    lastActivity: new Date('2024-01-14T14:22:00')
  },
  {
    id: 'q3',
    title: 'TypeScript generics with React components',
    description: '<p>I\'m trying to create a reusable Table component...</p>',
    tags: ['typescript', 'react', 'generics'],
    author: mockUsers[0],
    createdAt: new Date('2024-01-13T16:45:00'),
    updatedAt: new Date('2024-01-13T16:45:00'),
    votes: 15,
    answers: [],
    views: 203,
    isResolved: false,
    acceptedAnswerId: undefined,
    watchers: [],
    lastActivity: new Date('2024-01-13T16:45:00')
  }
];

// 🔹 Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'answer',
    message: 'mike_tech answered your question...',
    isRead: false,
    createdAt: new Date('2024-01-15T10:30:00'),
    questionId: 'q1',
    answerId: 'ans1',
    triggeredBy: mockUsers[1],
    recipient: '1'
  },
  {
    id: 'n2',
    type: 'comment',
    message: 'sarah_dev commented on your answer',
    isRead: false,
    createdAt: new Date('2024-01-14T15:22:00'),
    questionId: 'q1',
    answerId: 'ans1',
    triggeredBy: mockUsers[0],
    recipient: '2'
  },
  {
    id: 'n3',
    type: 'mention',
    message: 'You were mentioned in a question...',
    isRead: true,
    createdAt: new Date('2024-01-13T12:15:00'),
    questionId: 'q3',
    triggeredBy: mockUsers[0],
    recipient: '2'
  }
];
