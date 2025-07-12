export interface User {
  id: string;
  username: string;
  email: string;
  role: 'guest' | 'user' | 'admin';
  avatar?: string;
  reputation: number;
  joinedAt: Date;
  isActive: boolean;
  lastSeen: Date;
  badges: Badge[];
  stats: UserStats;
}

export interface UserStats {
  questionsAsked: number;
  answersGiven: number;
  acceptedAnswers: number;
  totalVotes: number;
  helpfulVotes: number;
  commentsPosted: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: Date;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
  votes: number;
  answers: Answer[];
  views: number;
  isResolved: boolean;
  acceptedAnswerId?: string;
  watchers: string[]; // User IDs watching this question
  lastActivity: Date;
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  questionId: string;
  createdAt: Date;
  updatedAt: Date;
  votes: number;
  isAccepted: boolean;
  comments: Comment[];
  mentions: string[]; // User IDs mentioned in this answer
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  answerId: string;
  createdAt: Date;
  mentions: string[]; // User IDs mentioned in this comment
}

export interface Notification {
  id: string;
  type: 'answer' | 'comment' | 'mention' | 'acceptance' | 'vote' | 'badge';
  message: string;
  isRead: boolean;
  createdAt: Date;
  questionId?: string;
  answerId?: string;
  commentId?: string;
  triggeredBy: User; // Who caused this notification
  recipient: string; // User ID who receives this notification
}

export interface Vote {
  id: string;
  userId: string;
  targetId: string; // questionId or answerId
  type: 'up' | 'down';
  targetType: 'question' | 'answer';
  createdAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'question_posted' | 'answer_posted' | 'comment_posted' | 'vote_cast' | 'answer_accepted' | 'badge_earned';
  description: string;
  createdAt: Date;
  metadata: {
    questionId?: string;
    answerId?: string;
    commentId?: string;
    voteType?: 'up' | 'down';
    badgeId?: string;
  };
}

export interface UserPermissions {
  canViewQuestions: boolean;
  canViewAnswers: boolean;
  canPostQuestions: boolean;
  canPostAnswers: boolean;
  canVote: boolean;
  canComment: boolean;
  canAcceptAnswers: boolean;
  canModerate: boolean;
  canManageUsers: boolean;
  canDeleteContent: boolean;
}