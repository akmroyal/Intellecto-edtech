import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface Course {
  id: string;
  title?: string;
  description?: string;
  created_at?: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await api.get<Course[]>('/courses');
        if (cancelled) return;
        setCourses(data || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            Back
          </Button>
          <h2 className="text-2xl font-bold">Courses</h2>
        </div>
      </div>
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
      <div className="space-y-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          courses.map(c => (
            <Card key={c.id} className="p-3 flex items-center justify-between">
              <CardContent className="flex items-center justify-between w-full">
                <div>
                  <div className="font-semibold">{c.title || 'Untitled'}</div>
                  <div className="text-sm text-muted-foreground">{c.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => navigate(`/course-start/${c.id}`, { state: { course: c } })}>
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;
