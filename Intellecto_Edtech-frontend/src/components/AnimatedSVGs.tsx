import React from 'react';

export const InterviewIcon = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(262, 52%, 47%)" />
        <stop offset="50%" stopColor="hsl(270, 60%, 55%)" />
        <stop offset="100%" stopColor="hsl(280, 45%, 60%)" />
      </linearGradient>
      <linearGradient id="lightPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(270, 60%, 85%)" />
        <stop offset="100%" stopColor="hsl(262, 52%, 70%)" />
      </linearGradient>
    </defs>
    
    {/* Monitor */}
    <rect x="40" y="60" width="120" height="80" rx="8" fill="url(#purpleGradient)" className="animate-pulse-soft" />
    <rect x="50" y="70" width="100" height="60" rx="4" fill="hsl(250, 30%, 99%)" />
    
    {/* Screen content - person silhouette */}
    <circle cx="100" cy="95" r="12" fill="url(#lightPurple)" className="animate-float" />
    <path d="M85 110 Q100 105 115 110 L115 120 L85 120 Z" fill="url(#lightPurple)" className="animate-float" />
    
    {/* Stand */}
    <rect x="95" y="140" width="10" height="20" fill="url(#purpleGradient)" />
    <rect x="80" y="160" width="40" height="5" rx="2" fill="url(#purpleGradient)" />
    
    {/* Floating icons */}
    <circle cx="30" cy="40" r="3" fill="hsl(262, 70%, 65%)" className="animate-float" style={{animationDelay: '0.5s'}} />
    <circle cx="170" cy="50" r="4" fill="hsl(270, 60%, 70%)" className="animate-float" style={{animationDelay: '1s'}} />
    <circle cx="25" cy="120" r="2" fill="hsl(280, 45%, 60%)" className="animate-float" style={{animationDelay: '1.5s'}} />
    <circle cx="175" cy="130" r="3" fill="hsl(262, 52%, 47%)" className="animate-float" style={{animationDelay: '2s'}} />
  </svg>
);

export const CodingIcon = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(262, 52%, 47%)" />
        <stop offset="100%" stopColor="hsl(280, 45%, 60%)" />
      </linearGradient>
    </defs>
    
    {/* Laptop */}
    <rect x="30" y="80" width="140" height="90" rx="8" fill="url(#codeGradient)" className="animate-scale-in" />
    <rect x="40" y="90" width="120" height="70" rx="4" fill="hsl(260, 15%, 15%)" />
    
    {/* Code lines */}
    <rect x="50" y="100" width="30" height="3" rx="1" fill="hsl(262, 70%, 65%)" className="animate-slide-right" style={{animationDelay: '0.2s'}} />
    <rect x="85" y="100" width="20" height="3" rx="1" fill="hsl(270, 60%, 70%)" className="animate-slide-right" style={{animationDelay: '0.4s'}} />
    <rect x="50" y="110" width="40" height="3" rx="1" fill="hsl(280, 45%, 60%)" className="animate-slide-right" style={{animationDelay: '0.6s'}} />
    <rect x="50" y="120" width="25" height="3" rx="1" fill="hsl(262, 52%, 47%)" className="animate-slide-right" style={{animationDelay: '0.8s'}} />
    <rect x="80" y="120" width="35" height="3" rx="1" fill="hsl(270, 60%, 55%)" className="animate-slide-right" style={{animationDelay: '1s'}} />
    <rect x="50" y="130" width="45" height="3" rx="1" fill="hsl(262, 70%, 65%)" className="animate-slide-right" style={{animationDelay: '1.2s'}} />
    <rect x="50" y="140" width="30" height="3" rx="1" fill="hsl(280, 45%, 60%)" className="animate-slide-right" style={{animationDelay: '1.4s'}} />
    
    {/* Cursor */}
    <rect x="95" y="140" width="2" height="4" fill="hsl(262, 70%, 65%)" className="animate-pulse-soft" />
    
    {/* Keyboard */}
    <rect x="35" y="175" width="130" height="15" rx="3" fill="url(#codeGradient)" opacity="0.8" />
    
    {/* Floating brackets */}
    <text x="20" y="60" fontSize="16" fill="hsl(262, 52%, 47%)" className="animate-float">&lt;/&gt;</text>
    <text x="160" y="70" fontSize="14" fill="hsl(270, 60%, 55%)" className="animate-float" style={{animationDelay: '1s'}}>{`{}`}</text>
    <text x="15" y="140" fontSize="12" fill="hsl(280, 45%, 60%)" className="animate-float" style={{animationDelay: '2s'}}>( )</text>
  </svg>
);

export const AnalyticsIcon = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="analyticsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(270, 60%, 55%)" />
        <stop offset="100%" stopColor="hsl(280, 45%, 60%)" />
      </linearGradient>
    </defs>
    
    {/* Chart bars */}
    <rect x="40" y="120" width="20" height="50" rx="2" fill="url(#analyticsGradient)" className="animate-fade-up" style={{animationDelay: '0.2s'}} />
    <rect x="70" y="100" width="20" height="70" rx="2" fill="hsl(262, 52%, 47%)" className="animate-fade-up" style={{animationDelay: '0.4s'}} />
    <rect x="100" y="80" width="20" height="90" rx="2" fill="hsl(270, 60%, 70%)" className="animate-fade-up" style={{animationDelay: '0.6s'}} />
    <rect x="130" y="110" width="20" height="60" rx="2" fill="hsl(280, 45%, 60%)" className="animate-fade-up" style={{animationDelay: '0.8s'}} />
    
    {/* Trend line */}
    <path d="M40 140 Q70 120 100 100 Q130 110 160 120" stroke="hsl(262, 70%, 65%)" strokeWidth="3" fill="none" className="animate-glow" />
    
    {/* Floating data points */}
    <circle cx="50" r="4" fill="hsl(262, 70%, 65%)" className="animate-pulse-soft">
      <animateMotion dur="3s" repeatCount="indefinite">
        <path d="M50,40 Q100,30 150,50 Q100,70 50,40" />
      </animateMotion>
    </circle>
    
    {/* Grid lines */}
    <line x1="30" y1="170" x2="170" y2="170" stroke="hsl(250, 20%, 88%)" strokeWidth="1" />
    <line x1="30" y1="170" x2="30" y2="60" stroke="hsl(250, 20%, 88%)" strokeWidth="1" />
  </svg>
);

export const CalendarIcon = ({ className = "w-20 h-20" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(262, 52%, 47%)" />
        <stop offset="100%" stopColor="hsl(270, 60%, 55%)" />
      </linearGradient>
    </defs>
    
    {/* Calendar base */}
    <rect x="50" y="60" width="100" height="120" rx="8" fill="url(#calendarGradient)" className="animate-scale-in" />
    <rect x="60" y="80" width="80" height="90" rx="4" fill="hsl(250, 30%, 99%)" />
    
    {/* Calendar rings */}
    <rect x="70" y="40" width="6" height="30" rx="3" fill="hsl(262, 52%, 47%)" />
    <rect x="124" y="40" width="6" height="30" rx="3" fill="hsl(262, 52%, 47%)" />
    
    {/* Calendar grid */}
    <rect x="70" y="90" width="10" height="8" rx="1" fill="hsl(262, 70%, 65%)" className="animate-fade-up" style={{animationDelay: '0.2s'}} />
    <rect x="85" y="90" width="10" height="8" rx="1" fill="hsl(270, 60%, 70%)" className="animate-fade-up" style={{animationDelay: '0.4s'}} />
    <rect x="100" y="90" width="10" height="8" rx="1" fill="hsl(280, 45%, 60%)" className="animate-fade-up" style={{animationDelay: '0.6s'}} />
    <rect x="115" y="90" width="10" height="8" rx="1" fill="hsl(262, 52%, 47%)" className="animate-fade-up" style={{animationDelay: '0.8s'}} />
    
    <rect x="70" y="105" width="10" height="8" rx="1" fill="hsl(270, 60%, 55%)" className="animate-fade-up" style={{animationDelay: '1s'}} />
    <rect x="85" y="105" width="10" height="8" rx="1" fill="hsl(280, 45%, 60%)" className="animate-fade-up" style={{animationDelay: '1.2s'}} />
    
    {/* Special event dot */}
    <circle cx="105" cy="109" r="2" fill="hsl(0, 84%, 60%)" className="animate-pulse-soft" />
    
    {/* Floating clock */}
    <circle cx="170" cy="50" r="15" fill="hsl(270, 60%, 85%)" className="animate-float" />
    <line x1="170" y1="45" x2="170" y2="50" stroke="hsl(262, 52%, 47%)" strokeWidth="2" />
    <line x1="170" y1="50" x2="173" y2="53" stroke="hsl(262, 52%, 47%)" strokeWidth="1" />
  </svg>
);