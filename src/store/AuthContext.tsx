import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as authService from "../services/auth";
import type { User } from "@/types";
import { getStoredUser, setStoredUser } from "@/lib/auth";

export interface AuthContextType {
  isAuthenticate: boolean;
  user: User | null;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; data?: { user: User }; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      const result = await authService.register(username, email, password);
      return result;
    },
    [],
  );

  const login = useCallback(async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (result.success && result.data) {
      setUser(result.data.user);
      setStoredUser(result.data.user);
    }
    return result;
  }, []);

  const logout = useCallback(async () => {
    authService.logout();
    setStoredUser(null);
    setUser(null);
  }, []);

  const isAuthenticate = !!user;

  return (
    <AuthContext.Provider
      value={{ isAuthenticate, user, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
