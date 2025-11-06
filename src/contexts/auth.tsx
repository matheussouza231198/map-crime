import * as React from "react";

interface Credentials {
  email: string
  password: string
};

interface AuthenticatedUser {
  id: string
  email: string
  roles: Array<string>
}

export interface AuthContext {
  isAuthenticated: boolean
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
  user: AuthenticatedUser | null
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = "tanstack.auth.user";

function getStoredUser() {
  const user = localStorage.getItem(key);
  return user ? JSON.parse(user) : null;
}

function setStoredUser(user: AuthenticatedUser | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthenticatedUser | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = React.useCallback(() => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (credentials: Credentials) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (credentials.email !== "admin@sistema.com") {
      throw new Error("Email ou senha inválidos");
    }

    if (credentials.password !== "admin123") {
      throw new Error("Email ou senha inválidos");
    }

    const _user: AuthenticatedUser = {
      id: "1",
      email: credentials.email,
      roles: ["user"],
    };

    setStoredUser(_user);
    setUser(_user);
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function getContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
