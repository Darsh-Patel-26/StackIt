import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserPermissions, Activity, Notification } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  permissions: UserPermissions;
  hasPermission: (perm: keyof UserPermissions) => boolean;
  activities: Activity[];
  notifications: Notification[];
  updateUserStats: (statType: keyof User['stats'], increment?: number) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  addActivity: (activity: Omit<Activity, 'id' | 'userId' | 'createdAt'>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getPermissions = (role: User['role']): UserPermissions => {
  switch (role) {
    case 'admin':
      return {
        canViewQuestions: true,
        canViewAnswers: true,
        canPostQuestions: true,
        canPostAnswers: true,
        canVote: true,
        canComment: true,
        canAcceptAnswers: true,
        canModerate: true,
        canManageUsers: true,
        canDeleteContent: true,
      };
    case 'user':
      return {
        canViewQuestions: true,
        canViewAnswers: true,
        canPostQuestions: true,
        canPostAnswers: true,
        canVote: true,
        canComment: true,
        canAcceptAnswers: true,
        canModerate: false,
        canManageUsers: false,
        canDeleteContent: false,
      };
    case 'guest':
    default:
      return {
        canViewQuestions: true,
        canViewAnswers: true,
        canPostQuestions: false,
        canPostAnswers: false,
        canVote: false,
        canComment: false,
        canAcceptAnswers: false,
        canModerate: false,
        canManageUsers: false,
        canDeleteContent: false,
      };
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const permissions = user ? getPermissions(user.role) : getPermissions('guest');

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('stackit_user');
    const savedActivities = localStorage.getItem('stackit_activities');
    const savedNotifications = localStorage.getItem('stackit_notifications');

    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser({
        ...userData,
        joinedAt: new Date(userData.joinedAt),
        lastSeen: new Date(userData.lastSeen || Date.now()),
      });
    }

    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }

    if (savedNotifications) {
      const notificationData = JSON.parse(savedNotifications);
      setNotifications(notificationData.map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt),
        triggeredBy: {
          ...n.triggeredBy,
          joinedAt: new Date(n.triggeredBy.joinedAt),
          lastSeen: new Date(n.triggeredBy.lastSeen),
        }
      })));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual API call
      let mockUser: User;
      
      if (email === 'admin@stackit.com') {
        mockUser = {
          id: 'admin',
          username: 'admin',
          email,
          role: 'admin',
          reputation: 5000,
          joinedAt: new Date('2022-06-10'),
          isActive: true,
          lastSeen: new Date(),
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
          badges: [
            {
              id: 'admin-badge',
              name: 'Administrator',
              description: 'Platform administrator',
              icon: '🛡️',
              color: 'purple',
              earnedAt: new Date('2022-06-10')
            }
          ],
          stats: {
            questionsAsked: 25,
            answersGiven: 150,
            acceptedAnswers: 120,
            totalVotes: 2500,
            helpfulVotes: 2300,
            commentsPosted: 300
          }
        };
      } else {
        mockUser = {
          id: '1',
          username: 'john_doe',
          email,
          role: 'user',
          reputation: 150,
          joinedAt: new Date('2023-01-15'),
          isActive: true,
          lastSeen: new Date(),
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
          badges: [
            {
              id: 'first-question',
              name: 'Curious',
              description: 'Asked your first question',
              icon: '❓',
              color: 'blue',
              earnedAt: new Date('2023-01-16')
            }
          ],
          stats: {
            questionsAsked: 3,
            answersGiven: 12,
            acceptedAnswers: 8,
            totalVotes: 45,
            helpfulVotes: 42,
            commentsPosted: 25
          }
        };
      }
      
      setUser(mockUser);
      localStorage.setItem('stackit_user', JSON.stringify(mockUser));
      
      // Add login activity
      addActivity({
        type: 'question_posted',
        description: 'Logged into the platform',
        metadata: {}
      });

    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: Date.now().toString(),
        username,
        email,
        role: 'user',
        reputation: 0,
        joinedAt: new Date(),
        isActive: true,
        lastSeen: new Date(),
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
        badges: [],
        stats: {
          questionsAsked: 0,
          answersGiven: 0,
          acceptedAnswers: 0,
          totalVotes: 0,
          helpfulVotes: 0,
          commentsPosted: 0
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('stackit_user', JSON.stringify(mockUser));
      
      // Add welcome notification
      addNotification({
        type: 'badge',
        message: 'Welcome to StackIt! Start by asking your first question.',
        isRead: false,
        triggeredBy: mockUser,
        recipient: mockUser.id
      });

    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setActivities([]);
    setNotifications([]);
    localStorage.removeItem('stackit_user');
    localStorage.removeItem('stackit_activities');
    localStorage.removeItem('stackit_notifications');
  };

  const updateUserStats = (statType: keyof User['stats'], increment: number = 1) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      stats: {
        ...user.stats,
        [statType]: user.stats[statType] + increment
      },
      reputation: user.reputation + (increment * 5) // 5 reputation points per stat increase
    };

    setUser(updatedUser);
    localStorage.setItem('stackit_user', JSON.stringify(updatedUser));
  };

  const addActivity = (activity: Omit<Activity, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date(),
      ...activity
    };

    const updatedActivities = [newActivity, ...activities].slice(0, 50); // Keep last 50 activities
    setActivities(updatedActivities);
    localStorage.setItem('stackit_activities', JSON.stringify(updatedActivities));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      createdAt: new Date(),
      ...notification
    };

    const updatedNotifications = [newNotification, ...notifications].slice(0, 100); // Keep last 100 notifications
    setNotifications(updatedNotifications);
    localStorage.setItem('stackit_notifications', JSON.stringify(updatedNotifications));
  };

  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('stackit_notifications', JSON.stringify(updatedNotifications));
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('stackit_notifications', JSON.stringify(updatedNotifications));
  };

  const hasPermission = (perm: keyof UserPermissions): boolean => {
    return permissions[perm] || false;
  };


  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      permissions,
      hasPermission,
      activities,
      notifications,
      updateUserStats,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      addActivity,
      addNotification
    }}>
      {children}
    </AuthContext.Provider>
  );
};