import React, { useEffect, useState } from 'react';
import { api, getCourseById } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseFull {
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

const CoursePage: React.FC = () => {
  const [ids, setIds] = useState<string[] | null>(null);
  const [courses, setCourses] = useState<CourseFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await api.get<CourseFull[]>('/courses');
        if (cancelled) return;
        const idsList = (list || []).map(c => c.id);
        setIds(idsList);

        // Fetch each course details sequentially and append to the feed
        for (const id of idsList) {
          if (cancelled) break;
          try {
            const full = await getCourseById<CourseFull>(id);
            if (cancelled) break;
            setCourses(prev => [...prev, full]);
          } catch (innerErr) {
            // append an error placeholder for this course
            setCourses(prev => [...prev, { id, title: `Failed to load ${id}`, description: String(innerErr) } as CourseFull]);
          }
        }
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
      <h1 className="text-2xl font-bold mb-4">Course Feed</h1>
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

      <div className="space-y-4">
        {ids === null && loading && <div>Loading courses...</div>}
        {ids && ids.length === 0 && <div>No courses found.</div>}

        {courses.map((c) => (
          <Card key={c.id} className="p-4">
            <CardHeader>
              <CardTitle className="text-lg">{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm text-muted-foreground">{c.description}</div>
              <div className="text-xs text-muted-foreground mb-2">Level: {c.level || 'N/A'}</div>
              <div className="text-xs text-muted-foreground mb-2">Duration: {c.estimated_duration ? `${c.estimated_duration} min` : '—'}</div>
              {c.objectives && (
                <div className="text-sm mb-2">
                  <strong>Objectives:</strong>
                  <ul className="list-disc ml-5">
                    {c.objectives.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <Button size="sm">Start Lecture</Button>
                <Button variant="outline" size="sm">Enroll</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
