import React from 'react';
import { Clock, User, Video } from 'lucide-react';

interface Interview {
  id: string;
  coursename: string;
  description: string;
  time: string;
  duration: string;
  type: 'technical' | 'behavioral' | 'system-design';
  avatar?: string;
}

const interviews: Interview[] = [
  {
    id: '1',
    coursename: 'Python Course',
    description: 'python basics to advance',
    time: '10:00 AM',
    duration: '60 min',
    type: 'technical'
  },
  {
    id: '2',
    coursename: 'Java Script Course',
    description: 'Java Script basics to advance',
    time: '2:30 PM',
    duration: '45 min',
    type: 'technical'
  },
  {
    id: '3',
    coursename: 'Full Stack Development Course',
    description: 'Full stack web development from basic to advance',
    time: '4:00 PM',
    duration: '30 min',
    type: 'technical'
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'technical':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'behavioral':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'system-design':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const UpcomingInterviews: React.FC = () => {
  return (
    <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">All Courses</h2>
        <span className="text-sm text-muted-foreground">{interviews.length} scheduled</span>
      </div>
      
      <div className="space-y-4">
        {interviews.map((interview, index) => (
          <div 
            key={interview.id}
            className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent/50 transition-all duration-300 hover-lift border border-border animate-slide-right"
            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{interview.coursename}</h3>
                <p className="text-sm text-muted-foreground">{interview.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(interview.type)}`}>
                    {interview.type}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span>{interview.time}</span>
              </div>
              <div className="text-xs text-muted-foreground mb-2">{interview.duration}</div>
              <button className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors text-sm">
                <Video className="w-4 h-4" />
                <span>Join</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover-lift hover-scale">
          View All My Interviews
        </button>
      </div>
    </div>
  );
};