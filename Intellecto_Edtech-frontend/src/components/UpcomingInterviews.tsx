import React, { useEffect, useState } from 'react';
import { Clock, User, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id?: string;
  tags?: string | string[];
  level?: string;
  thumbnail?: string;
  objectives?: string[];
  estimated_duration?: number;
  is_published?: boolean;
  enrollment_count?: number;
  rating?: number;
  review_count?: number;
  created_at?: string;
  updated_at?: string;
}

// Fallback sample (used only if fetch fails)
const fallbackCourses: Course[] = [
  {
    id: '1',
    title: 'Python Course',
    description: 'Python basics to advance',
    level: 'Beginner',
    estimated_duration: 60,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'JavaScript Course',
    description: 'JavaScript basics to advance',
    level: 'Intermediate',
    estimated_duration: 45,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: '3',
    title: 'Full Stack Development Course',
    description: 'Full stack web development from basic to advance',
    level: 'Advanced',
    estimated_duration: 120,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  }
];


const getTypeColor = (level?: string) => {
  switch ((level || '').toLowerCase()) {
    case 'beginner':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'intermediate':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'advanced':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const UpcomingInterviews: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = (import.meta.env.VITE_API_BASE as string) || '';
        const res = await fetch(`${base}/courses`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Course[] = await res.json();
        if (cancelled) return;
        // sort by created_at desc and take top 3
        const sorted = (data || []).slice().sort((a, b) => {
          const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
          const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
          return tb - ta;
        });
        setCourses(sorted.slice(0, 3));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message || 'Failed to load courses');
        setCourses(fallbackCourses.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
    return () => {
      cancelled = true;
    };
  }, []);

  const list = courses || fallbackCourses.slice(0, 3);

  return (
    <div className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">All Courses</h2>
        <span className="text-sm text-muted-foreground">{loading ? '...' : `${list.length} recent`}</span>
      </div>

      {error && (
        <div className="text-sm text-red-600 mb-3">Failed to load latest courses: {error}</div>
      )}

      <div className="space-y-4">
        {list.map((course, index) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-4 rounded-lg bg-card hover:bg-accent/50 transition-all duration-300 hover-lift border border-border animate-slide-right"
            style={{ animationDelay: `${0.6 + index * 0.05}s` }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-muted">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate">{course.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{course.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(course.level)}`}>
                    {course.level || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span>{course.created_at ? new Date(course.created_at).toLocaleDateString() : '—'}</span>
              </div>
              <div className="text-xs text-muted-foreground mb-2">{course.estimated_duration ? `${course.estimated_duration} min` : ''}</div>
              <button
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors text-sm"
                onClick={() => {
                  return navigate(`/course-start/${course.id}`, { state: { course } });
                }}
              >
                <Video className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button
          className="w-full py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover-lift hover-scale"
          onClick={() => navigate('/courses')}
        >
          View All My Courses
        </button>
      </div>
    </div>
  );
};