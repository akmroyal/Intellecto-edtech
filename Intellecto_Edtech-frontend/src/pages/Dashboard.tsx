import React, { useEffect, useState } from 'react';
import logo from '../../public/favicon.png';
import { Bell, Search, Settings, User, LogOut } from 'lucide-react';
import { DashboardStats } from '../components/DashboardStats';
import { QuickActions } from '../components/QuickActions';
import { UpcomingInterviews } from '../components/UpcomingInterviews';
import { RecentActivity } from '../components/RecentActivity';
import { ThemeToggle } from '../components/ThemeToggle';
import { auth } from '@/components/auth/firebase';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = auth.currentUser?.email || JSON.parse(localStorage.getItem('it_user_meta') || 'null')?.email;
        if (!email) return;
        const res = await api.get(`/users/by-email?email=${encodeURIComponent(email)}`);
        setProfile(res);
      } catch (err) {
        console.warn('Failed to load profile:', err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent">
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="gradient-primary p-2 rounded-lg">
                <img src={logo} alt="Intellecto Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Intellecto</h1>
                <p className="text-sm text-muted-foreground">Student Interview Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search candidates, interviews..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 w-64"
                />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale relative">
                <Bell className="w-5 h-5 text-muted-foreground transition-colors" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse-soft"></span>
              </button>

              {/* Settings */}
              <button onClick={() => navigate('/settings')} className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
                <Settings className="w-5 h-5 text-muted-foreground transition-colors" />
              </button>

              {/* User Menu */}
              <button onClick={() => navigate('/profile')} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-foreground">{profile?.full_name || auth.currentUser?.displayName || auth.currentUser?.email || "User"}</p>
                    <p className="text-xs text-muted-foreground">{profile?.role ? `${profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} · Student` : 'Computer Science Student'}</p>
                  </div>
                </div>
              </button>
              <div>
                <button onClick={() => auth.signOut()} className="p-1 rounded hover:bg-accent transition-colors">
                  <LogOut className="w-4 h-4 text-muted-foreground" ></LogOut>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-up">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, {profile?.full_name || auth.currentUser?.displayName} 👋</h2>
          <p className="text-muted-foreground">Ready to ace your upcoming interviews? Let's get started!</p>
        </div>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Quick Actions */}
        <QuickActions />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UpcomingInterviews />
          <RecentActivity />
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">My Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Course Completion Rate</span>
                <span className="text-sm font-medium text-foreground">87.5%</span>
              </div>
              <div className="w-full bg-accent rounded-full h-2">
                <div className="gradient-primary h-2 rounded-full" style={{ width: '87.5%' }}></div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Project Rating</span>
                <span className="text-sm font-medium text-foreground">4.6/5</span>
              </div>
              <div className="w-full bg-accent rounded-full h-2">
                <div className="gradient-primary h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.9s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">My Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Courses Enrolled</span>
                <span className="text-lg font-bold text-primary">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Modules Completed</span>
                <span className="text-lg font-bold text-primary">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Practice Hours This Month</span>
                <span className="text-lg font-bold text-primary">42h</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '1s' }}>
            <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">AI Professor Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                  <span className="text-sm font-medium text-green-600">Excellent</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">3D Avatar Engine</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Code Sandbox</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                  <span className="text-sm font-medium text-green-600">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};