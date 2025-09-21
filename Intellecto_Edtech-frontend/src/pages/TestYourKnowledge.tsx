import React, { useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';
import { auth } from '@/components/auth/firebase';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Bell, Search, Settings, User, LogOut, Tag, Download, FileText, ArrowLeft } from 'lucide-react';
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

const QUESTION_POOL: Record<string, Question[]> = {
  Algorithms: [
    { id: 'alg-1', text: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctIndex: 1 },
    { id: 'alg-2', text: 'Which sorting algorithm is stable?', options: ['QuickSort', 'MergeSort', 'HeapSort', 'SelectionSort'], correctIndex: 1 },
    { id: 'alg-3', text: 'What is the worst-case time complexity of QuickSort?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(n log n)'], correctIndex: 2 },
    { id: 'alg-4', text: 'Which algorithm uses a divide and conquer approach?', options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'], correctIndex: 2 },
    { id: 'alg-5', text: 'What data structure is typically used in Dijkstra\'s algorithm?', options: ['Stack', 'Queue', 'Priority Queue', 'Linked List'], correctIndex: 2 },
    { id: 'alg-6', text: 'Which algorithm finds the shortest path between all pairs of nodes?', options: ['Dijkstra', 'Bellman-Ford', 'Floyd-Warshall', 'A*'], correctIndex: 2 },
    { id: 'alg-7', text: 'What is the time complexity of inserting an element into a heap?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctIndex: 1 },
    { id: 'alg-8', text: 'Which searching algorithm requires the data to be sorted?', options: ['Linear Search', 'Binary Search', 'Interpolation Search', 'Both Binary and Interpolation'], correctIndex: 3 },
    { id: 'alg-9', text: 'What is the main advantage of using dynamic programming?', options: ['Reduces time complexity', 'Reduces space complexity', 'Avoids recomputation', 'Simplifies code'], correctIndex: 2 },
    { id: 'alg-10', text: 'Which algorithm is used for cycle detection in graphs?', options: ['Dijkstra', 'Floyd\'s Cycle Finding', 'Kruskal', 'Prim'], correctIndex: 1 },
    { id: 'alg-11', text: 'What is the time complexity of the Knuth-Morris-Pratt algorithm?', options: ['O(n)', 'O(n log n)', 'O(n + m)', 'O(n²)'], correctIndex: 2 },
    { id: 'alg-12', text: 'Which algorithm is not used for finding minimum spanning trees?', options: ['Prim', 'Kruskal', 'Dijkstra', 'Borůvka'], correctIndex: 2 },
    { id: 'alg-13', text: 'What is the space complexity of recursive Fibonacci without memoization?', options: ['O(1)', 'O(n)', 'O(2ⁿ)', 'O(n²)'], correctIndex: 1 },
    { id: 'alg-14', text: 'Which sorting algorithm has the best worst-case time complexity?', options: ['QuickSort', 'MergeSort', 'HeapSort', 'BubbleSort'], correctIndex: 1 },
    { id: 'alg-15', text: 'What technique does the Fibonacci heap use for efficient operations?', options: ['Lazy deletion', 'Amortized analysis', 'Memoization', 'Backtracking'], correctIndex: 1 },
    { id: 'alg-16', text: 'Which algorithm is used for solving the N-Queens problem?', options: ['Dynamic Programming', 'Greedy Algorithm', 'Backtracking', 'Divide and Conquer'], correctIndex: 2 },
    { id: 'alg-17', text: 'What is the time complexity of the Sieve of Eratosthenes?', options: ['O(n)', 'O(n log n)', 'O(n log log n)', 'O(n²)'], correctIndex: 2 }
  ],
  'Data Structures': [
    { id: 'ds-1', text: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctIndex: 1 },
    { id: 'ds-2', text: 'A hash table provides average-case lookup time of?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], correctIndex: 0 },
    { id: 'ds-3', text: 'Which data structure is best for implementing a priority queue?', options: ['Array', 'Linked List', 'Heap', 'Stack'], correctIndex: 2 },
    { id: 'ds-4', text: 'What is the time complexity of searching in a balanced BST?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctIndex: 1 },
    { id: 'ds-5', text: 'Which data structure uses the FIFO principle?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctIndex: 1 },
    { id: 'ds-6', text: 'What is the main advantage of a doubly linked list over a singly linked list?', options: ['Less memory', 'Faster insertion', 'Bidirectional traversal', 'Easier implementation'], correctIndex: 2 },
    { id: 'ds-7', text: 'Which data structure is typically used for implementing recursion?', options: ['Queue', 'Stack', 'Tree', 'Hash Table'], correctIndex: 1 },
    { id: 'ds-8', text: 'What is the worst-case time complexity of searching in a hash table?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctIndex: 2 },
    { id: 'ds-9', text: 'Which of these is a self-balancing binary search tree?', options: ['AVL Tree', 'Binary Heap', 'Trie', 'B-tree'], correctIndex: 0 },
    { id: 'ds-10', text: 'What is the time complexity of inserting at the end of a dynamic array?', options: ['O(1) amortized', 'O(log n)', 'O(n)', 'O(n²)'], correctIndex: 0 },
    { id: 'ds-11', text: 'Which data structure is used for implementing a dictionary?', options: ['Stack', 'Queue', 'Hash Table', 'Linked List'], correctIndex: 2 },
    { id: 'ds-12', text: 'What is the space complexity of a adjacency matrix for a graph with n vertices?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'], correctIndex: 2 },
    { id: 'ds-13', text: 'Which data structure is efficient for prefix searches?', options: ['Hash Table', 'Binary Search Tree', 'Trie', 'Heap'], correctIndex: 2 },
    { id: 'ds-14', text: 'What is the height of a complete binary tree with n nodes?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctIndex: 1 },
    { id: 'ds-15', text: 'Which data structure is used in breadth-first search?', options: ['Stack', 'Queue', 'Priority Queue', 'Heap'], correctIndex: 1 },
    { id: 'ds-16', text: 'What is the main disadvantage of adjacency list representation of graphs?', options: ['Slow to add vertices', 'Slow to check edge existence', 'Uses more memory', 'Difficult to implement'], correctIndex: 1 },
    { id: 'ds-17', text: 'Which data structure would be best for an LRU cache implementation?', options: ['Stack and Queue', 'Hash Table and Doubly Linked List', 'Two Arrays', 'Binary Search Tree'], correctIndex: 1 }
  ],
  JavaScript: [
    { id: 'js-1', text: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'function', 'const (not block-scoped)'], correctIndex: 1 },
    { id: 'js-2', text: 'What is a Promise in JS?', options: ['A value', 'An eventually-resolved value', 'A function', 'A loop construct'], correctIndex: 1 },
    { id: 'js-3', text: 'What does the "this" keyword refer to in a method?', options: ['The function itself', 'The global object', 'The object that owns the method', 'The parent object'], correctIndex: 2 },
    { id: 'js-4', text: 'Which method creates a new array with results of calling a function?', options: ['forEach()', 'map()', 'reduce()', 'filter()'], correctIndex: 1 },
    { id: 'js-5', text: 'What is the purpose of the "use strict" directive?', options: ['Enforces stricter type checking', 'Enables faster execution', 'Enforces stricter parsing and error handling', 'Enables ES6 features'], correctIndex: 2 },
    { id: 'js-6', text: 'What is a closure in JavaScript?', options: ['A function that has no name', 'A function that returns another function', 'A function with access to its outer scope', 'A function that is passed as an argument'], correctIndex: 2 },
    { id: 'js-7', text: 'Which method is used to handle fulfilled promises?', options: ['then()', 'catch()', 'finally()', 'resolve()'], correctIndex: 0 },
    { id: 'js-8', text: 'What does JSON.stringify() do?', options: ['Parses JSON string', 'Converts object to JSON string', 'Validates JSON', 'Stringifies functions'], correctIndex: 1 },
    { id: 'js-9', text: 'What is the difference between == and ===?', options: ['No difference', '=== checks value and type', '== checks value and type', '=== allows type coercion'], correctIndex: 1 },
    { id: 'js-10', text: 'Which symbol is used for template literals?', options: ['Single quotes', 'Double quotes', 'Backticks', 'Dollar sign'], correctIndex: 2 },
    { id: 'js-11', text: 'What does the spread operator (...) do?', options: ['Expands iterables', 'Compresses arrays', 'Creates new objects', 'Spreads function arguments'], correctIndex: 0 },
    { id: 'js-12', text: 'Which method adds elements to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctIndex: 0 },
    { id: 'js-13', text: 'What is the purpose of the async keyword?', options: ['Makes function synchronous', 'Makes function return a promise', 'Handles errors', 'Improves performance'], correctIndex: 1 },
    { id: 'js-14', text: 'Which method returns the first element that matches a selector?', options: ['querySelector()', 'querySelectorAll()', 'getElementById()', 'getElementsByClassName()'], correctIndex: 0 },
    { id: 'js-15', text: 'What is event bubbling in JavaScript?', options: ['Events start from target and propagate upward', 'Events start from document and go to target', 'Multiple events fire simultaneously', 'Events are canceled before reaching target'], correctIndex: 0 },
    { id: 'js-16', text: 'Which method creates a new array with all elements that pass a test?', options: ['map()', 'filter()', 'reduce()', 'forEach()'], correctIndex: 1 },
    { id: 'js-17', text: 'What is the purpose of the bind() method?', options: ['Binds events to elements', 'Creates a new function with specific this value', 'Binds variables to functions', 'Connects two functions together'], correctIndex: 1 }
  ],
  'System Design': [
    { id: 'sd-1', text: 'CDNs are used primarily for?', options: ['Security', 'Latency reduction', 'Authentication', 'Database sharding'], correctIndex: 1 },
    { id: 'sd-2', text: 'A load balancer helps with?', options: ['Scaling', 'Storage', 'Sorting', 'Compiling'], correctIndex: 0 },
    { id: 'sd-3', text: 'What is the purpose of database indexing?', options: ['To reduce storage', 'To improve query performance', 'To enforce data integrity', 'To backup data'], correctIndex: 1 },
    { id: 'sd-4', text: 'Which caching strategy writes to cache and database simultaneously?', options: ['Write-through', 'Write-back', 'Write-around', 'Cache-aside'], correctIndex: 0 },
    { id: 'sd-5', text: 'What is the CAP theorem?', options: ['A database consistency model', 'A theorem about distributed systems', 'A network protocol', 'A security principle'], correctIndex: 1 },
    { id: 'sd-6', text: 'What does ACID stand for in databases?', options: ['Atomicity, Consistency, Isolation, Durability', 'Availability, Consistency, Integrity, Durability', 'Atomicity, Concurrency, Isolation, Durability', 'Automation, Consistency, Integration, Durability'], correctIndex: 0 },
    { id: 'sd-7', text: 'Which protocol is used for stateless authentication?', options: ['OAuth', 'JWT', 'SSL', 'TCP'], correctIndex: 1 },
    { id: 'sd-8', text: 'What is the purpose of message queues?', options: ['To store emails', 'To decouple system components', 'To prioritize network traffic', 'To manage database connections'], correctIndex: 1 },
    { id: 'sd-9', text: 'Which database type is best for hierarchical data?', options: ['Relational', 'Document', 'Graph', 'Key-Value'], correctIndex: 2 },
    { id: 'sd-10', text: 'What is sharding in databases?', options: ['Horizontal partitioning', 'Vertical partitioning', 'Data replication', 'Data compression'], correctIndex: 0 },
    { id: 'sd-11', text: 'Which is a characteristic of microservices architecture?', options: ['Tight coupling', 'Shared database', 'Independent deployment', 'Monolithic codebase'], correctIndex: 2 },
    { id: 'sd-12', text: 'What is the purpose of API gateways?', options: ['To secure databases', 'To provide a single entry point for APIs', 'To load balance network traffic', 'To cache API responses'], correctIndex: 1 },
    { id: 'sd-13', text: 'Which factor is most important for choosing a database?', options: ['Popularity', 'Query patterns', 'Color of logo', 'Programming language'], correctIndex: 1 },
    { id: 'sd-14', text: 'What is eventual consistency?', options: ['Immediate consistency guarantee', 'Consistency after some time', 'No consistency guarantee', 'Strong consistency model'], correctIndex: 1 },
    { id: 'sd-15', text: 'Which technique helps with database read scalability?', options: ['Sharding', 'Replication', 'Normalization', 'Indexing'], correctIndex: 1 },
    { id: 'sd-16', text: 'What is the purpose of circuit breakers in distributed systems?', options: ['To prevent electrical issues', 'To stop cascading failures', 'To break network connections', 'To reset systems'], correctIndex: 1 },
    { id: 'sd-17', text: 'Which is a NoSQL database type?', options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'], correctIndex: 2 }
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
  const [reviewTest, setReviewTest] = useState<Test | null>(null);
  const [reviewResult, setReviewResult] = useState<Result | null>(null);
  const [reviewAnswers, setReviewAnswers] = useState<(number | null)[]>([]);
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
    // lock scroll and move to top
    document.body.style.overflow = 'hidden';
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
    setResults((r) => {
      const updated = [result, ...r].slice(0, 10);
      try { saveToStorage(STORAGE_KEYS.results, updated); } catch (e) { /* ignore */ }
      // attempt sending result to backend (best-effort)
      (async () => {
        try {
          await api.post('/results', result);
        } catch (e) {
          // ignore network errors - data is already in localStorage
          // console.warn('Failed to send result to backend', e);
        }
      })();
      return updated;
    });
    // keep review data so user stays in the same block and can see answers
    setReviewTest(runningTest);
    setReviewResult(result);
    setReviewAnswers(answers);
    // reset runner UI state but keep overlay open (overflow remains locked)
    setRunningTest(null);
    setCurrentIndex(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(0);
    setRunningStart(null);
  };

  const closeReview = () => {
    setReviewTest(null);
    setReviewResult(null);
    setReviewAnswers([]);
    // restore scrolling
    document.body.style.overflow = '';
  };

  const downloadCSVForReview = (res: Result, test: Test, ans: (number | null)[]) => {
    const rows = ['question,chosen,chosenIndex,correct,correctIndex,isCorrect'];
    test.questions.forEach((q, idx) => {
      const chosenIdx = ans[idx];
      const chosen = chosenIdx !== null && chosenIdx !== undefined ? q.options[chosenIdx] : '';
      const correct = q.options[q.correctIndex];
      const isCorrect = chosenIdx === q.correctIndex ? 'true' : 'false';
      rows.push(`"${q.text.replace(/"/g, '""')}","${chosen.replace(/"/g, '""')}",${chosenIdx ?? ''},"${correct.replace(/"/g, '""')}",${q.correctIndex},${isCorrect}`);
    });
    rows.push(`Total,${res.score},, ,${res.total},`);
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.testTitle.replace(/\s+/g, '_')}_result.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDFForReview = (res: Result, test: Test, ans: (number | null)[]) => {
    // Create a printable HTML and open print dialog so user can save as PDF
    const style = `body{font-family:Inter,system-ui,Arial,Helvetica,sans-serif;color:#0f172a} .q{margin-bottom:12px;padding:8px;border-radius:6px} .correct{background:#ecfccb} .wrong{background:#fee2e2}`;
    let html = `<!doctype html><html><head><meta charset="utf-8"><title>${res.testTitle}</title><style>${style}</style></head><body>`;
    html += `<h1>${res.testTitle}</h1><div><strong>Score:</strong> ${res.score}/${res.total}</div><div><strong>Time:</strong> ${res.timeTakenSec}s</div><hr/>`;
    test.questions.forEach((q, idx) => {
      const chosenIdx = ans[idx];
      const chosen = chosenIdx !== null && chosenIdx !== undefined ? q.options[chosenIdx] : '(no answer)';
      const correct = q.options[q.correctIndex];
      const isCorrect = chosenIdx === q.correctIndex;
      html += `<div class="q ${isCorrect ? 'correct' : 'wrong'}"><div><strong>Q${idx+1}.</strong> ${q.text}</div><div><strong>Your answer:</strong> ${chosen}</div><div><strong>Correct:</strong> ${correct}</div></div>`;
    });
    html += `</body></html>`;
    const w = window.open('', '_blank');
    if (!w) return; // popup blocked
    w.document.open();
    w.document.write(html);
    w.document.close();
    // give the browser a moment then call print
    setTimeout(() => { try { w.print(); } catch (e) { /* ignore */ } }, 400);
  };

  const cancelRun = () => {
    setRunningTest(null);
    setTimeLeft(0);
    setRunningStart(null);
    document.body.style.overflow = '';
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
              <button 
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-accent transition-all duration-300 hover-scale"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
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

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Course Generator */}
          <div className="glass rounded-xl p-6 animate-fade-up lg:col-span-4 flex flex-col justify-between w-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Course Generator</h3>
              <Tag className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-3">Enter tags (comma separated) like <code>#react,#data-structures,#cloud-native</code> to generate a tailored course outline.</p>
            <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="#web-dev, #react" className="w-full mt-2 mb-3 input border border-border rounded px-3 py-2 bg-card placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <div className="flex space-x-2 mb-4">
              <button className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/60" onClick={() => {
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
              <button className="px-4 py-2 rounded-md border border-border bg-card hover:bg-accent/30" onClick={() => { setTagsInput(''); setGeneratedCourse(null); }}>Clear</button>
            </div>

            {generatedCourse && (
              <div className="mt-2 border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{generatedCourse.title}</div>
                    <div className="text-xs text-muted-foreground">{generatedCourse.tags.join(', ') || '—'}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                      <button className="px-3 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/90" onClick={() => navigate('/interview-window')}>Launch AI Professor</button>
                      <button className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90" onClick={() => enrollCourse(generatedCourse)}>Enroll</button>
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
          {/* <div className="glass rounded-xl p-6 animate-fade-up lg:col-span-4 flex flex-col justify-between w-full">
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
                      <button className="px-3 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/90" onClick={() => setSelectedCourseId(c.id)}>View Tests</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div> */}

          {/* Create test (moved) */}
          <div className="glass rounded-xl p-6 animate-fade-up lg:col-span-4 flex flex-col justify-between w-full">
            <h3 className="text-lg font-semibold text-foreground mb-3">Create Custom Test</h3>
            <label className="text-sm text-muted-foreground">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-2 mb-3 input border border-border rounded px-3 py-2 bg-card placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />

            <label className="text-sm text-muted-foreground">Topic</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full mt-2 mb-3 select border border-border rounded px-3 py-2 bg-card placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              {DEFAULT_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <label className="text-sm text-muted-foreground">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Test['difficulty'])} className="w-full mt-2 mb-3 select border border-border rounded px-3 py-2 bg-card placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <label className="text-sm text-muted-foreground">Number of Questions</label>
            <input type="number" value={numQuestions} min={1} max={20} onChange={(e) => setNumQuestions(Number(e.target.value))} className="w-full mt-2 mb-4 input border border-border rounded px-3 py-2 bg-card placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />

            <div className="flex space-x-3">
              <button className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/60" onClick={handleCreateTest}>Create Test</button>
              <button className="px-4 py-2 rounded-md border border-border bg-card hover:bg-accent/30" onClick={() => { setTitle(''); setNumQuestions(3); setTopic(DEFAULT_TOPICS[0]); setDifficulty('Easy'); }}>Reset</button>
            </div>
          </div>

          {/* Middle (expanded): Available tests / runner */}
          <div className={`glass rounded-xl p-6 lg:col-span-8 animate-fade-up`}>
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
                          <button className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90" onClick={() => startTest(t)}>Take Test</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">Recent Results</h3>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 rounded-md border border-border bg-card hover:bg-accent/30" onClick={() => {
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
                    <button className="px-3 py-2 rounded-md border border-border bg-card hover:bg-accent/30" onClick={() => {
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

            {/* runningTest is displayed in a full-screen overlay to keep focus */}
          </div>

          {/* Right column folded into middle on large screens; keep layout responsive */}
        </div>
      </main>
      {/* Full-screen focused test overlay */}
      {(runningTest || reviewTest) && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40">
          <div className="w-full max-w-4xl glass rounded-xl p-6 overflow-y-auto max-h-[90vh]">
            {/* Live running test */}
            {runningTest && (
              <>
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
                        <button key={idx} onClick={() => selectAnswer(idx)} className={`text-left p-3 rounded-lg border w-full ${chosen ? 'border-primary bg-primary/10' : 'border-border'} transition-colors`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">Answered: {answers.filter((a) => a !== null).length}/{runningTest.questions.length}</div>
                    <div className="space-x-2">
                      <button className="px-3 py-2 rounded-md border border-border bg-card hover:bg-accent/30" onClick={() => { cancelRun(); }} aria-label="Stop test">Stop</button>
                      <button className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90" onClick={nextQuestion}>{currentIndex < runningTest.questions.length - 1 ? 'Next' : 'Finish'}</button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Review mode after finishing */}
            {reviewTest && reviewResult && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{reviewTest.title} — Review</h3>
                    <p className="text-sm text-muted-foreground">{reviewTest.topic} • Reviewed on {new Date(reviewResult.date).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${reviewResult.score / reviewResult.total >= 0.6 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {reviewResult.score}/{reviewResult.total} ({Math.round((reviewResult.score / reviewResult.total) * 100)}%)
                    </div>
                    <div className="text-sm text-muted-foreground">Time: {reviewResult.timeTakenSec}s</div>
                  </div>
                </div>

                <div className="mb-4">
                  {reviewTest.questions.map((q, idx) => {
                    const chosenIdx = reviewAnswers[idx];
                    const isCorrect = chosenIdx === q.correctIndex;
                    return (
                      <div key={q.id} className={`p-3 mb-3 rounded-lg border ${isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                        <div className="font-medium text-foreground">Q{idx + 1}. {q.text}</div>
                        <div className="text-sm text-muted-foreground mt-2">Your answer: <span className="font-semibold">{chosenIdx !== null && chosenIdx !== undefined ? q.options[chosenIdx] : '—'}</span></div>
                        <div className="text-sm text-muted-foreground">Correct answer: <span className="font-semibold">{q.options[q.correctIndex]}</span></div>
                        <div className={`mt-2 inline-block px-2 py-1 rounded text-sm font-semibold ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>{isCorrect ? 'Correct' : 'Incorrect'}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-x-2">
                    <button className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90" onClick={() => { if (reviewResult && reviewTest) downloadCSVForReview(reviewResult, reviewTest, reviewAnswers); }}>Download CSV</button>
                    <button className="px-3 py-2 rounded-md border border-border bg-card hover:bg-accent/30" onClick={() => { if (reviewResult && reviewTest) downloadPDFForReview(reviewResult, reviewTest, reviewAnswers); }}>Download PDF</button>
                  </div>
                  <div>
                    <button className="px-3 py-2 rounded-md border border-border bg-card hover:bg-accent/30" onClick={closeReview}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestYourKnowledge;