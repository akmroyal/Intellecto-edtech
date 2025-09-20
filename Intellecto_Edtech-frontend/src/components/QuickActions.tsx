// import React from 'react';
// import { Video, Plus, Settings, BarChart3 } from 'lucide-react';
// import { InterviewIcon, CodingIcon, AnalyticsIcon, CalendarIcon } from './AnimatedSVGs';

// interface ActionCardProps {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   animatedIcon: React.ReactNode;
//   delay?: string;
//   onClick?: () => void;
// }

// const ActionCard: React.FC<ActionCardProps> = ({ 
//   title, 
//   description, 
//   icon, 
//   animatedIcon, 
//   delay = '0s',
//   onClick 
// }) => (
//   <div 
//     className="glass rounded-xl p-6 hover-lift hover-glow cursor-pointer transition-all duration-500 animate-scale-in group hover-scale"
//     style={{ animationDelay: delay }}
//     onClick={onClick}
//   >
//     <div className="flex flex-col items-center text-center space-y-4">
//       <div className="relative transform group-hover:scale-110 transition-transform duration-500">
//         <div className="opacity-100 transition-all duration-500 group-hover:animate-float">
//           {animatedIcon}
//         </div>
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
//         <p className="text-muted-foreground text-sm group-hover:text-accent-foreground transition-colors duration-300">{description}</p>
//       </div>
//     </div>
//   </div>
// );

// export const QuickActions: React.FC = () => {
//   const actions = [
//     {
//       title: 'Join Interview',
//       description: 'Join your scheduled interview session',
//       icon: <Video className="w-8 h-8 text-white" />,
//       animatedIcon: <InterviewIcon className="w-16 h-16" />,
//       delay: '0.1s',
//     },
//     {
//       title: 'Practice Coding',
//       description: 'Practice with coding challenges',
//       icon: <Plus className="w-8 h-8 text-white" />,
//       animatedIcon: <CodingIcon className="w-16 h-16" />,
//       delay: '0.2s'
//     },
//     {
//       title: 'My Progress',
//       description: 'View your interview performance',
//       icon: <BarChart3 className="w-8 h-8 text-white" />,
//       animatedIcon: <AnalyticsIcon className="w-16 h-16" />,
//       delay: '0.3s'
//     },
//     {
//       title: 'My Schedule',
//       description: 'View upcoming interviews',
//       icon: <Settings className="w-8 h-8 text-white" />,
//       animatedIcon: <CalendarIcon className="w-16 h-16" />,
//       delay: '0.4s'
//     }
//   ];

//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">Quick Actions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {actions.map((action, index) => (
//           <ActionCard 
//             key={index} 
//             {...action}
//             onClick={() => console.log(`${action.title} clicked`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };



import React from 'react';
import { Video, Plus, Settings, BarChart3 } from 'lucide-react';
import { InterviewIcon, CodingIcon, AnalyticsIcon, CalendarIcon } from './AnimatedSVGs';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  animatedIcon: React.ReactNode;
  delay?: string;
  onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  description, 
  icon, 
  animatedIcon, 
  delay = '0s',
  onClick 
}) => (
  <div 
    className="glass rounded-xl p-6 hover-lift hover-glow cursor-pointer transition-all duration-500 animate-scale-in group hover-scale"
    style={{ animationDelay: delay }}
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="relative transform group-hover:scale-110 transition-transform duration-500">
        <div className="opacity-100 transition-all duration-500 group-hover:animate-float">
          {animatedIcon}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-sm group-hover:text-accent-foreground transition-colors duration-300">{description}</p>
      </div>
    </div>
  </div>
);

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Start New Course',
      description: 'Browse and start a new course',
      icon: <Video className="w-8 h-8 text-white" />,
      animatedIcon: <InterviewIcon className="w-16 h-16" />,
      delay: '0.1s',
      onClick: () => navigate('/create-course') // Add navigation here
    },
    {
      title: 'Test your knowledge',
      description: 'knowledge testing',
      icon: <Plus className="w-8 h-8 text-white" />,
      animatedIcon: <CodingIcon className="w-16 h-16" />,
      delay: '0.2s',
      onClick: () => navigate('/test')
    },
    {
      title: 'My Progress',
      description: 'View your interview performance',
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      animatedIcon: <AnalyticsIcon className="w-16 h-16" />,
      delay: '0.3s',
      onClick: () => navigate("/my-progress")
    },
    {
      title: 'Skill Gap Analyzer',
      description: 'Check readiness & get AI-driven recommendations',
      icon: <BarChart3 className="w-8 h-8 text-white" />,  // You can swap to another Lucide icon if you prefer
      animatedIcon: <AnalyticsIcon className="w-16 h-16" />,
      delay: '0.4s',
      onClick: () => navigate("/skill-gap-anlyzer")
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6 animate-fade-up">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <ActionCard 
            key={index} 
            {...action}
            // onClick={() => console.log(`${action.title} clicked`)}
          />
        ))}
      </div>
    </div>
  );
};