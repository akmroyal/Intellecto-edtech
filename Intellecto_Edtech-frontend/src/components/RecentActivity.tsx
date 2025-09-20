import React from 'react';
import { CheckCircle, XCircle, Clock, Star } from 'lucide-react';

interface Activity {
  id: string;
  type: 'completed' | 'cancelled' | 'pending' | 'rated';
  courseName: string;
  description: string;
  timestamp: string;
  details?: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'completed',
    courseName: 'Python Course',
    description: 'python basics to advance',
    timestamp: '2 hours ago',
    details: 'Technical course completed successfully'
  },
  {
    id: '2',
    type: 'pending',
    courseName: 'Spring Boot Course',
    description: 'Java development with Spring Boot',
    timestamp: '4 hours ago',
    details: 'course pending'
  },
  {
    id: '3',
    type: 'cancelled',
    courseName: 'Practice Test',
    description: 'Node js basics',
    timestamp: '6 hours ago',
    details: 'test rescheduled by candidate'
  },
  {
    id: '4',
    type: 'pending',
    courseName: 'Backend Development Course',
    description: 'backend development with Node js',
    timestamp: '1 day ago',
    details: 'Waiting for feedback submission'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'cancelled':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'pending':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'rated':
      return <Star className="w-5 h-5 text-purple-500" />;
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'completed':
      return 'border-green-200 bg-green-50';
    case 'cancelled':
      return 'border-red-200 bg-red-50';
    case 'pending':
      return 'border-yellow-200 bg-yellow-50';
    case 'rated':
      return 'border-purple-200 bg-purple-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

export const RecentActivity: React.FC = () => {
  return (
    <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.6s' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
        <span className="text-sm text-muted-foreground">Last 24 hours</span>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-300 hover-lift ${getActivityColor(activity.type)} animate-slide-right`}
            style={{ animationDelay: `${0.7 + index * 0.1}s` }}
          >
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-black truncate">
                  {activity.courseName}
                </h3>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              {activity.details && (
                <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>  

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover-lift hover-scale">
          View All My Activity
        </button>
      </div>
    </div>
  );
};