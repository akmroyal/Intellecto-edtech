import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { api } from '@/lib/api';

interface Course {
  id: string;
  title?: string;
  description?: string;
  tags?: string; // Backend stores tags as string, not array
  level?: string;
  estimated_duration?: number;
  created_at?: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTags, setSearchTags] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load courses with optional tag filtering
  const loadCourses = async (tags?: string[]) => {
    setLoading(true);
    try {
      let url = '/courses';
      if (tags && tags.length > 0) {
        const tagParams = tags.join(',');
        url += `?tags=${encodeURIComponent(tagParams)}`;
      }
      
      const data = await api.get<Course[]>(url);
      setCourses(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Handle search input
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTags.trim()) {
      const newTags = searchTags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const uniqueTags = [...new Set([...activeFilters, ...newTags])];
      setActiveFilters(uniqueTags);
      loadCourses(uniqueTags);
      setSearchTags('');
    }
  };

  // Remove a filter tag
  const removeFilter = (tagToRemove: string) => {
    const newFilters = activeFilters.filter(tag => tag !== tagToRemove);
    setActiveFilters(newFilters);
    loadCourses(newFilters.length > 0 ? newFilters : undefined);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters([]);
    loadCourses();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            Back
          </Button>
          <h2 className="text-2xl font-bold">Courses</h2>
        </div>
        <Button onClick={() => navigate('/create-new-course')}>
          Create New Course
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by tags (e.g., web-development, machine-learning)"
              value={searchTags}
              onChange={(e) => setSearchTags(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">Active filters:</span>
            {activeFilters.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => removeFilter(tag)}
              >
                {tag}
                <X className="w-3 h-3" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
      
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {activeFilters.length > 0 
              ? "No courses found with the selected tags. Try different tags or clear filters."
              : "No courses available. Create your first course!"
            }
          </div>
        ) : (
          courses.map(c => (
            <Card key={c.id} className="p-4 hover:shadow-md transition-shadow">
              <CardContent className="flex items-start justify-between w-full p-0">
                <div className="flex-1">
                  <div className="font-semibold text-lg mb-2">{c.title || 'Untitled'}</div>
                  <div className="text-sm text-muted-foreground mb-3">{c.description}</div>
                  
                  {/* Course metadata */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    {c.level && <span>Level: {c.level}</span>}
                    {c.estimated_duration && <span>Duration: {c.estimated_duration} weeks</span>}
                  </div>

                  {/* Tags */}
                  {c.tags && c.tags.trim() && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {c.tags.split(',').map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" onClick={() => navigate(`/course-start/${c.id}`, { state: { course: c } })}>
                    Start Course
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