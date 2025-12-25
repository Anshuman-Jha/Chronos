"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  userId: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  teamId?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and user on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
  
    let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    
    
    apiBaseUrl = apiBaseUrl.trim().replace(/['"]+/g, '');

    
    apiBaseUrl = apiBaseUrl.replace(/\/$/, "");

   
    if (!apiBaseUrl) {
      apiBaseUrl = 'http://localhost:3001';
      console.warn('[DEBUG] Missing Env Var. Using fallback:', apiBaseUrl);
    }

    const apiUrl = `${apiBaseUrl}/auth/login`;
    console.log('[DEBUG] Cleaned Login URL:', apiUrl);
   

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Fix: Read text first to prevent crash if server returns HTML (404/500) instead of JSON
        const errorText = await response.text();
        let errorObj;
        try {
            errorObj = JSON.parse(errorText);
        } catch {
            errorObj = { message: errorText || "Login failed" };
        }
        throw new Error(errorObj.message || "Login failed");
      }

      const data = await response.json();
      const { token: newToken, user: userData } = data;

      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error: any) {
      console.error('[DEBUG] Login error:', error);
      throw new Error(error.message || "Login failed");
    }
  };

  const register = async (username: string, email: string, password: string) => {
 
    let apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    
    apiBaseUrl = apiBaseUrl.trim().replace(/['"]+/g, '');

    apiBaseUrl = apiBaseUrl.replace(/\/$/, "");

   
    if (!apiBaseUrl) {
      apiBaseUrl = 'http://localhost:3001';
      console.warn('[DEBUG] Missing Env Var. Using fallback:', apiBaseUrl);
    }

    const apiUrl = `${apiBaseUrl}/auth/register`;
    console.log('[DEBUG] Cleaned Register URL:', apiUrl);
    

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
      
         const errorText = await response.text();
         let errorObj;
         try {
             errorObj = JSON.parse(errorText);
         } catch {
             errorObj = { message: errorText || "Registration failed" };
         }
         throw new Error(errorObj.message || "Registration failed");
      }

      const data = await response.json();
      const { token: newToken, user: userData } = data;

      setToken(newToken);
      setUser(userData);
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error: any) {
      console.error('[DEBUG] Register error:', error);
      throw new Error(error.message || "Registration failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-dark-bg text-white">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !token) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-[#0b1224] to-[#0f172a] text-white">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.28),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.25),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1 space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-100 ring-1 ring-white/15">
              Chronos
              <span className="h-2 w-2 rounded-full bg-blue-300" />
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Orchestrate projects with <span className="text-blue-300">Chronos</span>
            </h1>
            <p className="max-w-xl text-base text-white/75">
              A modern workspace to align teams, visualize timelines, and keep your delivery on track.
              Sign in or create an account to continue where you left off.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-blue-500/10 backdrop-blur">
                <p className="text-sm font-semibold text-white">Unified views</p>
                <p className="mt-1 text-sm text-white/70">Board, table, and timeline in one place.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-blue-500/10 backdrop-blur">
                <p className="text-sm font-semibold text-white">Team momentum</p>
                <p className="mt-1 text-sm text-white/70">Assign, prioritize, and ship together.</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-2xl">
              <LoginForm onLogin={login} onRegister={register} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoginForm = ({
  onLogin,
  onRegister,
}: {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (username: string, email: string, password: string) => Promise<void>;
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await onLogin(email, password);
      } else {
        if (!username) {
          setError("Username is required");
          setLoading(false);
          return;
        }
        await onRegister(username, email, password);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">Project Chronos</p>
          <h2 className="mt-1 text-2xl font-semibold">
            {isLogin ? "Welcome back" : "Create your workspace"}
          </h2>
        </div>
        <div className="rounded-full bg-gradient-to-r from-blue-500/70 to-indigo-500/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          Chronos
        </div>
      </div>

      <div className="flex items-center rounded-full bg-white/10 p-1 text-sm font-semibold text-white/70">
        <button
          type="button"
          onClick={() => {
            setIsLogin(true);
            setError("");
          }}
          className={`flex-1 rounded-full px-4 py-2 transition ${isLogin ? "bg-white text-slate-900 shadow" : "hover:text-white"
            }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => {
            setIsLogin(false);
            setError("");
          }}
          className={`flex-1 rounded-full px-4 py-2 transition ${!isLogin ? "bg-white text-slate-900 shadow" : "hover:text-white"
            }`}
        >
          Sign up
        </button>
      </div>

      {!isLogin && (
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm text-white/80">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-white/60 shadow-inner focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Pick a display name"
            required={!isLogin}
          />
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-white/80">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-white/60 shadow-inner focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          placeholder="you@company.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-white/80">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white placeholder:text-white/60 shadow-inner focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          placeholder="Enter a secure password"
          required
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 focus:ring-offset-white/10 disabled:opacity-60"
      >
        {loading ? "Loading..." : isLogin ? "Sign in to Chronos" : "Create account"}
      </button>

      <p className="text-center text-xs text-white/60">
        {isLogin ? "New to Chronos? " : "Already onboarded? "}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="font-semibold text-blue-200 hover:text-white"
        >
          {isLogin ? "Create an account" : "Sign in"}
        </button>
      </p>
    </form>
  );
};

export default AuthProvider;