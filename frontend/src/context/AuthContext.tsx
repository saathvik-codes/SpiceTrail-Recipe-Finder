"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthUser } from "@/lib/api";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("spicetrail_token");
    const storedUser = localStorage.getItem("spicetrail_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function setSession(newToken: string, newUser: AuthUser) {
    localStorage.setItem("spicetrail_token", newToken);
    localStorage.setItem("spicetrail_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem("spicetrail_token");
    localStorage.removeItem("spicetrail_user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
