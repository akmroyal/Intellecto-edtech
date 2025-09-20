API client
--------------

This module provides a small centralized API client used by the frontend.

Usage
- Set environment variable `VITE_API_BASE` in `.env` to point to your backend (e.g. `VITE_API_BASE=http://localhost:8000/api`).
- Import `api` and call `api.get('/path')`, `api.post('/path', data)`, etc.

Examples
```ts
import { api } from '@/lib/api';
const tests = await api.get('/tests');
await api.post('/results', { score: 5 });
```

The client returns parsed JSON for JSON responses, and throws on non-2xx responses.
