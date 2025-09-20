import React from 'react';
import { TrendingUp, Users, Calendar, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  delay?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon, delay = '0s' }) => (
  <div 
    className="glass rounded-xl p-6 hover-lift hover-glow transition-all duration-300 animate-fade-up"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-lg gradient-purple-light">
        {icon}
      </div>
      <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
        <TrendingUp className={`w-4 h-4 ${!isPositive && 'rotate-180'}`} />
        <span>{change}</span>
      </div>
    </div>
    <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
    <p className="text-muted-foreground">{title}</p>
  </div>
);

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Skills Learned',
      value: '12+',
      change: '+12.5% since last month',
      isPositive: true,
      icon: <Users className="w-6 h-6 text-primary" />,
      delay: '0.1s'
    },
    {
      title: 'Courses In Progress Today',
      value: '8',
      change: '+8.2% since last day',
      isPositive: true,
      icon: <Calendar className="w-6 h-6 text-primary" />,
      delay: '0.2s'
    },
    {
      title: 'Avg. Duration',
      value: '45m',
      change: '-3.1%',
      isPositive: false,
      icon: <Clock className="w-6 h-6 text-primary" />,
      delay: '0.3s'
    },
    {
      title: 'Course Completion Rate',
      value: '94.2%',
      change: '+2.7%',
      isPositive: true,
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      delay: '0.4s'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};