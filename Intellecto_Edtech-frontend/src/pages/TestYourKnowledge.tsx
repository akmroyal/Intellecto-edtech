import React, { useEffect, useMemo, useState } from 'react';
import { auth } from '@/components/auth/firebase';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Bell, Search, Settings, User, LogOut, Tag, Download, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

type Test = {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[];
};

type Course = {
  id: string;
  title: string;
  tags: string[];
  modules: { title: string; lessons: string[]; project: string }[];
  status: 'enrolled' | 'completed';
  testIds: string[];
};

type Result = {
  id: string;
  testId: string;
  testTitle: string;
  score: number;
  total: number;
  date: string;
  timeTakenSec: number;
};

const DEFAULT_TOPICS = ['Algorithms', 'Data Structures', 'JavaScript', 'System Design'];

// small question pools for mock generation
const QUESTION_POOL: Record<string, Question[]> = {
  Algorithms: [
    { id: 'alg-1', text: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctIndex: 1 },
    { id: 'alg-2', text: 'Which sorting algorithm is stable?', options: ['QuickSort', 'MergeSort', 'HeapSort', 'SelectionSort'], correctIndex: 1 },
  ],
  'Data Structures': [
    { id: 'ds-1', text: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctIndex: 1 },
    { id: 'ds-2', text: 'A hash table provides average-case lookup time of?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correctIndex: 0 },
  ],
  JavaScript: [
    { id: 'js-1', text: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'function', 'const (not block-scoped)'], correctIndex: 1 },
    { id: 'js-2', text: 'What is a Promise in JS?', options: ['A value', 'An eventually-resolved value', 'A function', 'A loop construct'], correctIndex: 1 },
  ],
  'System Design': [
    { id: 'sd-1', text: 'CDNs are used primarily for?', options: ['Security', 'Latency reduction', 'Authentication', 'Database sharding'], correctIndex: 1 },
    { id: 'sd-2', text: 'A load balancer helps with?', options: ['Scaling', 'Storage', 'Sorting', 'Compiling'], correctIndex: 0 },
  ],
};

const STORAGE_KEYS = {
  tests: 'it_tests_v1',
  results: 'it_results_v1',
};

const generateId = (prefix = '') => `${prefix}${Math.random().toString(36).slice(2, 9)}`;

const loadFromStorage = <T,>(key: string, fallback: T) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
};

const TestYourKnowledge: React.FC = () => {
  const navigate = useNavigate();

  const [tests, setTests] = useState<Test[]>(() => loadFromStorage(STORAGE_KEYS.tests, []) as Test[]);
  const [results, setResults] = useState<Result[]>(() => loadFromStorage(STORAGE_KEYS.results, []) as Result[]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>(() => loadFromStorage('it_courses_v1', []) as Course[]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Course generator state
  const [tagsInput, setTagsInput] = useState('');
  const [generatedCourse, setGeneratedCourse] = useState<{ id: string; title: string; tags: string[]; modules: { title: string; lessons: string[]; project: string }[] } | null>(null);

  // Create form state
  const [title, setTitle] = useState('My Custom Test');
  const [topic, setTopic] = useState(DEFAULT_TOPICS[0]);
  const [difficulty, setDifficulty] = useState<Test['difficulty']>('Easy');
  const [numQuestions, setNumQuestions] = useState(3);

  // Runner state
  const [runningTest, setRunningTest] = useState<Test | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [runningStart, setRunningStart] = useState<number | null>(null);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.tests, tests);
  }, [tests]);

  useEffect(() => {
    saveToStorage('it_courses_v1', enrolledCourses);
  }, [enrolledCourses]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.results, results);
  }, [results]);

  useEffect(() => {
    let timer: number | undefined;
    if (runningTest && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (runningTest && timeLeft === 0 && runningStart !== null) {
      // time up, finish
      finishTest();
    }
    return () => { if (timer) clearInterval(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runningTest, timeLeft]);

  const mockGenerateQuestions = (topic: string, count: number): Question[] => {
    const pool = QUESTION_POOL[topic] ?? [];
    const out: Question[] = [];
    for (let i = 0; i < count; i++) {
      const sample = pool[i % pool.length];
      out.push({ ...sample, id: generateId(`${sample.id}-`) });
    }
    return out;
  };

  const handleCreateTest = () => {
    const q = mockGenerateQuestions(topic, Math.max(1, numQuestions));
    const newTest: Test = {
      id: generateId('test-'),
      title: title || `${topic} Test`,
      topic,
      difficulty,
      questions: q,
    };
    setTests((s) => [newTest, ...s]);
  };

  const enrollCourse = (courseData: Course | { title: string; tags: string[]; modules: Course['modules'] }) => {
    const courseId = generateId('course-');
    const courseModules = courseData.modules.map(m => ({ ...m }));
    // Create a test per module
    const newTests: Test[] = courseModules.map((m) => {
      const q = mockGenerateQuestions(m.title, 3);
      return {
        id: generateId('test-'),
        title: `${courseData.title} — ${m.title}`,
        topic: m.title,
        difficulty: 'Medium',
        questions: q,
      };
    });
    setTests((t) => [...newTests, ...t]);
    const testIds = newTests.map(n => n.id);
    const course: Course = {
      id: courseId,
      title: courseData.title,
      tags: courseData.tags,
      modules: courseModules,
      status: 'enrolled',
      testIds,
    };
    setEnrolledCourses((c) => [course, ...c]);
    saveToStorage('it_courses_v1', [course, ...enrolledCourses]);
  };

  const startTest = (test: Test) => {
    setRunningTest(test);
    setCurrentIndex(0);
    setAnswers(Array(test.questions.length).fill(null));
    setSelected(null);
    const totalTime = Math.max(30, test.questions.length * 45);
    setTimeLeft(totalTime);
    setRunningStart(Date.now());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectAnswer = (idx: number) => {
    setSelected(idx);
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = idx;
      return copy;
    });
  };

  const nextQuestion = () => {
    if (!runningTest) return;
    setSelected(null);
    if (currentIndex < runningTest.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    if (!runningTest) return;
    const end = Date.now();
    const timeTaken = runningStart ? Math.round((end - runningStart) / 1000) : 0;
    const total = runningTest.questions.length;
    const score = runningTest.questions.reduce((acc, q, idx) => (answers[idx] === q.correctIndex ? acc + 1 : acc), 0);
    const result: Result = {
      id: generateId('res-'),
      testId: runningTest.id,
      testTitle: runningTest.title,
      score,
      total,
      date: new Date().toISOString(),
      timeTakenSec: timeTaken,
    };
    setResults((r) => [result, ...r].slice(0, 10));
    // reset runner
    setRunningTest(null);
    setCurrentIndex(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(0);
    setRunningStart(null);
  };

  const cancelRun = () => {
    setRunningTest(null);
    setTimeLeft(0);
    setRunningStart(null);
  };

  const availableTests = useMemo(() => {
    // include built-in quick tests if none user-created
    if (tests.length > 0) return tests;
    // generate default tests from pools
    return Object.keys(QUESTION_POOL).map((t) => ({
      id: `builtin-${t}`,
      title: `${t} Quick Test`,
      topic: t,
      difficulty: 'Easy' as const,
      questions: mockGenerateQuestions(t, 3),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tests]);

  const analytics = useMemo(() => {
    if (results.length === 0) return { attempts: 0, avgScorePct: 0 };
    const attempts = results.length;
    const avg = Math.round((results.reduce((s, r) => s + (r.score / r.total) * 100, 0) / attempts));
    return { attempts, avgScorePct: avg };
  }, [results]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent">
      <header className="glass border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="gradient-primary p-2 rounded-lg">
                <img src="/favicon.png" alt="Intellecto logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Test Your Knowledge</h1>
                <p className="text-sm text-muted-foreground">Custom tests and challenges</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 w-64"
                />
              </div>

              <ThemeToggle />

              <button className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale relative">
                <Bell className="w-5 h-5 text-muted-foreground transition-colors" />
              </button>

              <button onClick={() => navigate('/settings')} className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
                <Settings className="w-5 h-5 text-muted-foreground transition-colors" />
              </button>

              <button onClick={() => navigate('/profile')} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale">
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>
              <div>
                <button onClick={() => auth.signOut()} className="p-1 rounded hover:bg-accent transition-colors">
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-up">
          <h2 className="text-3xl font-bold text-foreground mb-2">Test Your Knowledge</h2>
          <p className="text-muted-foreground">Create tests, take timed challenges, and track recent results. Animations and theme are unchanged.</p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="glass p-3 rounded-md">
              <div className="text-sm text-muted-foreground">Attempts</div>
              <div className="text-xl font-bold text-foreground">{analytics.attempts}</div>
            </div>
            <div className="glass p-3 rounded-md">
              <div className="text-sm text-muted-foreground">Avg Score</div>
              <div className="text-xl font-bold text-primary">{analytics.avgScorePct}%</div>
            </div>
          </div>
        </div>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Course Generator */}
          <div className="glass rounded-xl p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Course Generator</h3>
              <Tag className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">Enter tags (comma separated) like <code>#react,#data-structures,#cloud-native</code> to generate a tailored course outline.</p>
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="#web-dev, #react" className="w-full mt-2 mb-3 input" />
            <div className="flex space-x-2 mb-4">
              <button className="btn btn-primary" onClick={() => {
                // simple generator: split tags and create 3 modules
                const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
                const course = {
                  id: generateId('course-'),
                  title: `${tags.slice(0,3).join(' / ') || 'Custom Course'}`,
                  tags,
                  modules: Array.from({length: 3}).map((_, i) => ({
                    title: `Module ${i+1}: ${tags[i] ?? 'Core Concepts'}`,
                    lessons: [`Intro to ${tags[i] ?? 'Concepts'}`, `Hands-on ${tags[i] ?? 'Lab'}`],
                    project: `Project: Build a ${tags[i] ?? 'small'} demo`
                  }))
                };
                setGeneratedCourse(course);
              }}>Generate</button>
              <button className="btn" onClick={() => { setTagsInput(''); setGeneratedCourse(null); }}>Clear</button>
            </div>

            {generatedCourse && (
              <div className="mt-2 border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{generatedCourse.title}</div>
                    <div className="text-xs text-muted-foreground">{generatedCourse.tags.join(', ') || '—'}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                      <button className="btn btn-secondary" onClick={() => navigate('/interview-window')}>Launch AI Professor</button>
                      <button className="btn" onClick={() => enrollCourse(generatedCourse)}>Enroll</button>
                    </div>
                </div>
                <div className="mt-3 space-y-2">
                  {generatedCourse.modules.map((m, idx) => (
                    <div key={idx} className="p-2 border border-border rounded">
                      <div className="font-medium text-foreground">{m.title}</div>
                      <div className="text-xs text-muted-foreground">{m.lessons.join(' • ')}</div>
                      <div className="text-sm mt-2">{m.project}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enrolled Courses */}
          <div className="glass rounded-xl p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Enrolled Courses</h3>
            </div>
            {enrolledCourses.length === 0 ? (
              <div className="text-sm text-muted-foreground">You have no enrolled courses. Generate a course and click Enroll.</div>
            ) : (
              <div className="space-y-2">
                {enrolledCourses.map(c => (
                  <div key={c.id} className="p-3 border border-border rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.tags.join(', ')}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="btn" onClick={() => setSelectedCourseId(c.id)}>View Tests</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create test (moved) */}
          <div className="glass rounded-xl p-6 animate-fade-up">
            <h3 className="text-lg font-semibold text-foreground mb-3">Create Custom Test</h3>
            <label className="text-sm text-muted-foreground">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-2 mb-3 input border border-border rounded px-3 py-2 bg-card" />

            <label className="text-sm text-muted-foreground">Topic</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full mt-2 mb-3 select border border-border rounded px-3 py-2 bg-card">
              {DEFAULT_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <label className="text-sm text-muted-foreground">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Test['difficulty'])} className="w-full mt-2 mb-3 select border border-border rounded px-3 py-2 bg-card">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <label className="text-sm text-muted-foreground">Number of Questions</label>
            <input type="number" value={numQuestions} min={1} max={20} onChange={(e) => setNumQuestions(Number(e.target.value))} className="w-full mt-2 mb-4 input border border-border rounded px-3 py-2 bg-card" />

            <div className="flex space-x-3">
              <button className="btn btn-primary" onClick={handleCreateTest}>Create Test</button>
              <button className="btn" onClick={() => { setTitle(''); setNumQuestions(3); setTopic(DEFAULT_TOPICS[0]); setDifficulty('Easy'); }}>Reset</button>
            </div>
          </div>

          {/* Middle (expanded): Available tests / runner */}
          <div className={`glass rounded-xl p-6 col-span-2 animate-fade-up ${runningTest ? 'col-span-3 lg:col-span-4' : ''}`}>
            {!runningTest && (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-3">Available Tests</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {availableTests.filter(t => !selectedCourseId || (tests.findIndex(ts => ts.id === t.id) !== -1 && selectedCourseId ? enrolledCourses.find(c => c.id === selectedCourseId)?.testIds.includes(t.id) ?? true : true)).map((t) => (
                    <div key={t.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{t.title}</h4>
                          <p className="text-xs text-muted-foreground">{t.topic} • {t.difficulty} • {t.questions.length} Q</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="btn btn-primary" onClick={() => startTest(t)}>Take Test</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">Recent Results</h3>
                  <div className="flex items-center space-x-2">
                    <button className="btn" onClick={() => {
                      // export JSON
                      const data = { tests, results };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'intellecto-data.json';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}><Download className="w-4 h-4 inline-block mr-2"/> Export</button>
                    <button className="btn" onClick={() => {
                      // CSV of results
                      const rows = ['testTitle,date,score,total,timeTakenSec'];
                      results.forEach(r => rows.push(`${r.testTitle},${r.date},${r.score},${r.total},${r.timeTakenSec}`));
                      const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'results.csv';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}><FileText className="w-4 h-4 inline-block mr-2"/>CSV</button>
                  </div>
                </div>
                <div className="space-y-2">
                  {results.length === 0 && <p className="text-sm text-muted-foreground">No results yet — take a test to see your progress.</p>}
                  {results.map((r) => (
                    <div key={r.id} className="p-3 border border-border rounded-lg flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium text-foreground">{r.testTitle}</div>
                        <div className="text-xs text-muted-foreground">{new Date(r.date).toLocaleString()} • {r.score}/{r.total}</div>
                      </div>
                      <div className="text-sm font-semibold text-primary">{Math.round((r.score / r.total) * 100)}%</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {runningTest && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{runningTest.title}</h3>
                    <p className="text-sm text-muted-foreground">{runningTest.topic} • {runningTest.difficulty}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">Time left: <span className="font-medium text-foreground">{Math.max(0, timeLeft)}s</span></div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground">Question {currentIndex + 1} of {runningTest.questions.length}</div>
                    <div className="text-lg font-medium text-foreground mt-2">{runningTest.questions[currentIndex].text}</div>
                  </div>
                  <div className="grid gap-3">
                    {runningTest.questions[currentIndex].options.map((opt, idx) => {
                      const chosen = answers[currentIndex] === idx;
                      return (
                        <button key={idx} onClick={() => selectAnswer(idx)} className={`text-left p-3 rounded-lg border ${chosen ? 'border-primary bg-primary/10' : 'border-border'} transition-colors`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">Answered: {answers.filter((a) => a !== null).length}/{runningTest.questions.length}</div>
                    <div className="space-x-2">
                      <button className="btn" onClick={cancelRun}>Cancel</button>
                      <button className="btn btn-primary" onClick={nextQuestion}>{currentIndex < runningTest.questions.length - 1 ? 'Next' : 'Finish'}</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column folded into middle on large screens; keep layout responsive */}
        </div>
      </main>
    </div>
  );
};

export default TestYourKnowledge;
