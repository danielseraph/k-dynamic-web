import type { Vessel, TeamMember, Equipment, Message } from '../types';

export const API_BASE_URL = 'http://localhost:5000/api';
export const SERVER_ORIGIN = 'http://localhost:5000';

// Helper to construct full image URLs
export function getImageUrl(path: string | undefined | null): string {
  if (!path) return '/placeholder-vessel.jpeg'; // fallback placeholder
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // If it's stored as local assets or starts with public
  if (path.startsWith('public/')) {
    return '/' + path.substring(7);
  }
  if (path.startsWith('/public/')) {
    return path.substring(7);
  }
  return `${SERVER_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
}

// Get JWT token from storage
export function getToken(): string | null {
  return localStorage.getItem('ktech_admin_token');
}

// Set JWT token in storage
export function setToken(token: string): void {
  localStorage.setItem('ktech_admin_token', token);
}

// Clear JWT token
export function removeToken(): void {
  localStorage.removeItem('ktech_admin_token');
}

// General API request wrapper
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Set Content-Type only if it's not FormData (fetch handles boundary automatically for FormData)
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errorJson = await response.json();
      errorMsg = errorJson.error || errorJson.message || errorMsg;
    } catch {
      errorMsg = response.statusText || errorMsg;
    }
    throw new Error(errorMsg);
  }

  return response.json() as Promise<T>;
}

// Normalization helpers to map flat backend responses to nested frontend models
function normalizeVessel(raw: any): Vessel {
  if (!raw) return raw;
  if (raw.specs && raw.capacity) {
    return raw as Vessel;
  }

  let safetyCertifications: string[] = [];
  if (raw.safetyCertifications) {
    if (Array.isArray(raw.safetyCertifications)) {
      safetyCertifications = raw.safetyCertifications;
    } else {
      try {
        safetyCertifications = JSON.parse(raw.safetyCertifications);
      } catch {
        safetyCertifications = [];
      }
    }
  }

  let gallery: string[] = [];
  if (raw.gallery) {
    if (Array.isArray(raw.gallery)) {
      gallery = raw.gallery;
    } else {
      try {
        gallery = JSON.parse(raw.gallery);
      } catch {
        gallery = [];
      }
    }
  }

  return {
    id: raw.id,
    name: raw.name || '',
    type: raw.type || '',
    specs: {
      lengthOverall: raw.lengthOverall || '',
      breadth: raw.breadth || '',
      draft: raw.draft || '',
      mainEngines: raw.mainEngines || '',
      bhp: raw.bhp || '',
      bollardPull: raw.bollardPull || '',
      deckSpace: raw.deckSpace || '',
      flag: raw.flag || '',
    },
    capacity: {
      fuelOil: raw.fuelOil || '',
      freshWater: raw.freshWater || '',
      deckCargo: raw.deckCargo || '',
    },
    safetyCertifications,
    status: raw.status || 'Available',
    image: raw.image || '',
    gallery,
  };
}

function normalizeTeamMember(raw: any): TeamMember {
  if (!raw) return raw;
  let responsibilities: string[] = [];
  if (raw.responsibilities) {
    if (Array.isArray(raw.responsibilities)) {
      responsibilities = raw.responsibilities;
    } else {
      try {
        responsibilities = JSON.parse(raw.responsibilities);
      } catch {
        responsibilities = [];
      }
    }
  }

  return {
    id: raw.id,
    name: raw.name || '',
    role: raw.role || '',
    category: raw.category || 'supervisory',
    bio: raw.bio || '',
    experience: raw.experience || '',
    responsibilities,
    image: raw.image || '',
  };
}

function normalizeEquipment(raw: any): Equipment {
  if (!raw) return raw;
  return {
    id: raw.id,
    name: raw.name || '',
    type: raw.type || 'Other',
    specs: raw.specs || '',
    quantity: typeof raw.quantity === 'number' ? raw.quantity : parseInt(raw.quantity, 10) || 0,
    status: raw.status || 'Available',
    image: raw.image || '',
    description: raw.description || '',
    createdAt: raw.createdAt,
  };
}

function normalizeMessage(raw: any): Message {
  if (!raw) return raw;
  return {
    id: raw.id,
    name: raw.name || '',
    email: raw.email || '',
    phone: raw.phone || '',
    company: raw.company || '',
    serviceNeeded: raw.serviceNeeded || '',
    message: raw.message || '',
    messageType: raw.messageType || 'Contact',
    status: raw.status || 'Unread',
    quoteDetails: typeof raw.quoteDetails === 'string' ? raw.quoteDetails : raw.quoteDetails ? JSON.stringify(raw.quoteDetails) : null,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt,
  };
}

// API Methods
export const api = {
  // Auth
  auth: {
    login: async (username: string, password: string) => {
      const result = await apiFetch<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      setToken(result.token);
      return result.user;
    },
    getMe: async () => {
      return apiFetch<any>('/auth/me');
    },
    logout: () => {
      removeToken();
    }
  },

  // Vessels
  vessels: {
    getAll: async () => {
      const list = await apiFetch<any[]>('/vessels');
      return list.map(normalizeVessel);
    },
    getOne: async (id: string) => {
      const item = await apiFetch<any>(`/vessels/${id}`);
      return normalizeVessel(item);
    },
    create: async (formData: FormData) => {
      const item = await apiFetch<any>('/vessels', {
        method: 'POST',
        body: formData,
      });
      return normalizeVessel(item);
    },
    update: async (id: string, formData: FormData) => {
      const item = await apiFetch<any>(`/vessels/${id}`, {
        method: 'PUT',
        body: formData,
      });
      return normalizeVessel(item);
    },
    delete: async (id: string) => {
      return apiFetch<{ message: string }>(`/vessels/${id}`, {
        method: 'DELETE',
      });
    }
  },

  // Team
  team: {
    getAll: async () => {
      const list = await apiFetch<any[]>('/team');
      return list.map(normalizeTeamMember);
    },
    create: async (formData: FormData) => {
      const item = await apiFetch<any>('/team', {
        method: 'POST',
        body: formData,
      });
      return normalizeTeamMember(item);
    },
    update: async (id: string, formData: FormData) => {
      const item = await apiFetch<any>(`/team/${id}`, {
        method: 'PUT',
        body: formData,
      });
      return normalizeTeamMember(item);
    },
    delete: async (id: string) => {
      return apiFetch<{ message: string }>(`/team/${id}`, {
        method: 'DELETE',
      });
    }
  },

  // Equipment
  equipment: {
    getAll: async () => {
      const list = await apiFetch<any[]>('/equipment');
      return list.map(normalizeEquipment);
    },
    create: async (formData: FormData) => {
      const item = await apiFetch<any>('/equipment', {
        method: 'POST',
        body: formData,
      });
      return normalizeEquipment(item);
    },
    update: async (id: string, formData: FormData) => {
      const item = await apiFetch<any>(`/equipment/${id}`, {
        method: 'PUT',
        body: formData,
      });
      return normalizeEquipment(item);
    },
    delete: async (id: string) => {
      return apiFetch<{ message: string }>(`/equipment/${id}`, {
        method: 'DELETE',
      });
    }
  },

  // Messages / Inquiries / Quotes
  messages: {
    submit: async (data: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      serviceNeeded?: string;
      message: string;
      messageType: 'Contact' | 'Quote';
      quoteDetails?: any;
    }) => {
      const item = await apiFetch<any>('/messages', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return normalizeMessage(item);
    },
    getAll: async () => {
      const list = await apiFetch<any[]>('/messages');
      return list.map(normalizeMessage);
    },
    updateStatus: async (id: string, status: 'Unread' | 'Read' | 'Replied') => {
      const item = await apiFetch<any>(`/messages/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      return normalizeMessage(item);
    },
    delete: async (id: string) => {
      return apiFetch<{ message: string }>(`/messages/${id}`, {
        method: 'DELETE',
      });
    }
  }
};
