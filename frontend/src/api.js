
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
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
