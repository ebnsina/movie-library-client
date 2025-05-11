import type { User } from "@/types";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "./constants";

export function getStoredUser(): User | null {
  const stored = localStorage.getItem(AUTH_USER_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function setStoredUser(user: User | null) {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

export function getStoredToken(): string | null {
  const stored = localStorage.getItem(AUTH_TOKEN_KEY);
  return stored ?? null;
}

export function setStoredToken(token: string) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
