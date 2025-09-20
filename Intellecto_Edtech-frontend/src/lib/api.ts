const API_BASE = import.meta.env.VITE_API_BASE || import.meta.env.VITE_APP_API_BASE || '/api';

type RequestOptions = {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
};

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };

  const fetchOpts: RequestInit = {
    method: opts.method || 'GET',
    headers,
  };
  if (opts.body !== undefined) fetchOpts.body = JSON.stringify(opts.body);

  const res = await fetch(url, fetchOpts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status} ${res.statusText} ${text}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json() as Promise<T>;
  // fallback: return raw text
  return (res.text() as unknown) as T;
}

export const api = {
  get: <T = any>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T = any>(path: string, body?: any) => request<T>(path, { method: 'POST', body }),
  put: <T = any>(path: string, body?: any) => request<T>(path, { method: 'PUT', body }),
  del: <T = any>(path: string) => request<T>(path, { method: 'DELETE' }),
  base: API_BASE,
};

export default api;
