import { Center, Loader } from "@mantine/core";
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
  signup: (userData: UserSignUpData) => Promise<void>;
  logout: () => Promise<void>;
}

type BaseResponse<T> = {
  status: string;
  data: T;
};

type User = {
  id: string;
  firstName: string;
  email: string;
};

type UserSignUpData = Omit<User, "id"> & {
  lastName: string;
  password: string;
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
        // TODO: handle error
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signup = async (userData: UserSignUpData) => {
    const response = await fetch(`${BASE_URL_LOCAL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
    });

    if (!response.ok) {
      const res = await response.text();
      throw new Error(`${res}`, {
        cause: `${response.status} ${response.statusText}`,
      });
    }

    return;
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL_LOCAL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const res = await response.text();
        throw new Error(`${res}`, {
          cause: `${response.status} ${response.statusText}`,
        });
      }

      const result = (await response.json()) as BaseResponse<User>;
      setUser(result.data);
    } catch (error) {
      // TODO: handle error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL_LOCAL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const res = await response.text();
        throw new Error(`${res}`, {
          cause: `${response.status} ${response.statusText}`,
        });
      }

      setUser(null);
    } catch (error) {
      // TODO: handle error
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContext = {
    user,
    isLoading,
    login,
    signup,
    logout,
  };

  if (isLoading) {
    return (
      <Center maw={"100%"} h={"100vh"}>
        <Loader color="dark" />
      </Center>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};
