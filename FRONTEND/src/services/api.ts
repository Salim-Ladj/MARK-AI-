const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AuthResult {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'marketing' | 'creative';
    createdAt?: string;
  };
  token: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const payload = await response.json() as ApiResponse<T>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || 'Request failed');
  }
  return payload;
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('markai_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<AuthResult>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (fullName: string, email: string, password: string, role: 'marketing' | 'creative' = 'marketing') =>
      request<AuthResult>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ full_name: fullName, email, password, role }),
      }),
    forgotPassword: (email: string) =>
      request<{ resetInitiated: boolean }>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
  },
  brands: {
    getAll: () => request<unknown[]>('/brands', { headers: getAuthHeader() }),
    create: (brand: Record<string, unknown>) => request<unknown>('/brands', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(brand),
    }),
    update: (id: string, brand: Record<string, unknown>) => request<unknown>(`/brands/${id}`, {
      method: 'PATCH',
      headers: getAuthHeader(),
      body: JSON.stringify(brand),
    }),
  },
  campaigns: {
    getAll: () => request<unknown[]>('/campaigns', { headers: getAuthHeader() }),
    create: (campaign: Record<string, unknown>) => request<unknown>('/campaigns', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(campaign),
    }),
  },
  tasks: {
    getAll: () => request<unknown[]>('/tasks', { headers: getAuthHeader() }),
    create: (payload: Record<string, unknown>) => request<unknown>('/tasks', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(payload),
    }),
    submit: async (id: string, payload: Record<string, unknown>) => {
      const response = await fetch(`${API_BASE}/tasks/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(payload)
      });
      return response.json();
    },
  },
  calendar: {
    getAll: () => request<unknown[]>('/calendar', { headers: getAuthHeader() }),
    create: (payload: Record<string, unknown>) => request<unknown>('/calendar', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(payload),
    }),
  },
  assets: {
    getAll: () => request<unknown[]>('/assets', { headers: getAuthHeader() }),
  },
  creativeTeam: {
    getAll: () => request<unknown[]>('/creative-team', { headers: getAuthHeader() }),
  },
  performance: {
    get: () => request<{
      reach: number;
      impressions: number;
      engagementRate: number;
      linkClicks: number;
      attributedOrders: number;
    }>('/performance', { headers: getAuthHeader() }),
  },
  overview: {
    get: () => request<{
      activeBrands: number;
      liveCampaigns: number;
      scheduledDrops: number;
      completedAssets: number;
      activeCampaigns: Array<{ id: string; name: string; channel: string; pace: number }>;
    }>('/overview', { headers: getAuthHeader() }),
  },
  ai: {
    generate: async (payload: Record<string, unknown>) => {
      const response = await fetch(`${API_BASE}/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(payload),
      });
      const data = await response.json() as unknown;
      if (!response.ok) {
        const message = typeof data === 'object' && data !== null && 'message' in data
          ? String(data.message)
          : 'AI generation failed';
        throw new Error(message);
      }
      return data;
    },
  },
  creative: {
    getDashboard: () => request<Record<string, number>>('/creative/dashboard', { headers: getAuthHeader() }),
    getBriefs: () => request<unknown[]>('/creative/briefs', { headers: getAuthHeader() }),
    getReviews: () => request<unknown[]>('/creative/reviews', { headers: getAuthHeader() }),
    getCompleted: () => request<unknown[]>('/creative/completed', { headers: getAuthHeader() }),
    submitWork: (payload: Record<string, unknown>) => request<unknown>('/creative/submissions', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(payload),
    }),
    submitRevision: (payload: Record<string, unknown>) => request<unknown>('/creative/revisions', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(payload),
    }),
    archiveWork: (payload: Record<string, unknown>) => request<unknown>('/creative/archive', {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(payload),
    }),
  }
};