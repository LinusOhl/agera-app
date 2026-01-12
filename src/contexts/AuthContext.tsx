import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthContext {
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
}

type RefreshResponseType = {
  status: string;
  data: string;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/refresh", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to refresh access token.");
        }

        const data = (await response.json()) as RefreshResponseType;

        setAccessToken(data.data);
        setIsLoading(false);
      } catch (error) {
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setAccessToken(data.data);
  };

  const value: AuthContext = {
    accessToken,
    isLoading,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};
