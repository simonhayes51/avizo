
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

console.log('[API] Using API URL:', API_URL);

async function request(path, options = {}) {
  const token = localStorage.getItem('avizo_token');
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Add Authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log('[API] Request to', path, 'with token:', token.substring(0, 20) + '...');
  } else {
    console.log('[API] Request to', path, 'without token');
  }

  const res = await fetch(`${API_URL}${path}`, {
    headers,
    ...options,
  });

  console.log('[API] Response from', path, ':', res.status);

  if (!res.ok) {
    // Handle 401 Unauthorized - redirect to login
    if (res.status === 401) {
      console.error('[API] 401 Unauthorized - clearing token and redirecting');
      localStorage.removeItem('avizo_token');
      localStorage.removeItem('avizo_email');
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  waitlist: (email) =>
    request("/api/waitlist/", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  getWaitlist: () => request("/api/waitlist/"),

  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getCustomers: () => request("/api/customers/"),
  addCustomer: (data) =>
    request("/api/customers/", { method: "POST", body: JSON.stringify(data) }),

  getJobs: () => request("/api/jobs/"),
  addJob: (data) =>
    request("/api/jobs/", { method: "POST", body: JSON.stringify(data) }),

  getThreads: () => request("/api/inbox/threads"),
  getThread: (id) => request(`/api/inbox/threads/${id}`),
  sendMessage: (threadId, payload) =>
    request(`/api/inbox/threads/${threadId}/messages`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
