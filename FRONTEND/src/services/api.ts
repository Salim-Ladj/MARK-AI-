const API_BASE = 'http://localhost:5000/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('markai_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return res.json();
    }
  },
  brands: {
    getAll: async () => (await fetch(`${API_BASE}/brands`, { headers: getAuthHeader() })).json(),
  },
  campaigns: {
    getAll: async () => (await fetch(`${API_BASE}/campaigns`, { headers: getAuthHeader() })).json(),
  },
  tasks: {
    getAll: async () => (await fetch(`${API_BASE}/tasks`, { headers: getAuthHeader() })).json(),
    submit: async (id: string, payload: any) => {
      return (await fetch(`${API_BASE}/tasks/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(payload)
      })).json();
    }
  }
};