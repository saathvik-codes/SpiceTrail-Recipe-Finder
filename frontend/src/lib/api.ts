const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface FavoriteRecord {
  _id: string;
  mealId: string;
  mealName: string;
  mealThumb: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message ?? "Request failed");
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export function register(name: string, email: string, password: string) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function login(email: string, password: string) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function listFavorites(token: string) {
  return request<FavoriteRecord[]>("/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function addFavorite(token: string, meal: { mealId: string; mealName: string; mealThumb: string }) {
  return request<FavoriteRecord>("/favorites", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(meal),
  });
}

export function removeFavorite(token: string, mealId: string) {
  return request<void>(`/favorites/${mealId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
