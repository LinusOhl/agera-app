import { Loader } from "@mantine/core";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BASE_URL_LOCAL } from "../helpers";

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
}

type BaseResponse<T> = {
  status: string;
  data: T;
};

type User = {
  id: string;
  email: string;
  firstName: string;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await fetch(`${BASE_URL_LOCAL}/auth/refresh`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to refresh access token.");
        }

        const result = (await response.json()) as BaseResponse<User>;

        setUser(result.data);
        setIsLoading(false);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return <Loader color="dark" />;
  }

  const login = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL_LOCAL}/auth/login`, {
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

    const result = (await response.json()) as BaseResponse<User>;
    setUser(result.data);
  };

  const value: AuthContext = {
    user,
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
