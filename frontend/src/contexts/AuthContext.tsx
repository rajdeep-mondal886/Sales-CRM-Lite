"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearAuth,
  getStoredUser,
  getToken,
  setAuth,
} from "@/lib/auth-storage";
import type { User, UserRole } from "@/types/api";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  loginSession: (token: string, user: User) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setToken(getToken());
    setUser(getStoredUser());
    setIsLoading(false);
  }, []);

  const loginSession = useCallback((newToken: string, newUser: User) => {
    setAuth(newToken, newUser);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (role: UserRole) => user?.role === role,
    [user],
  );

  const value = useMemo(
    () => ({ user, token, isLoading, loginSession, logout, hasRole }),
    [user, token, isLoading, loginSession, logout, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
