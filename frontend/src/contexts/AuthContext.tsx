import { useState, useEffect, createContext, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { User } from "../../../interfaces/User";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextInterface {
  user: User | null;
  initialLoading: boolean;
  loading: boolean;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  initialLoading: true,
  loading: false,
  error: "",
  setError: () => {},
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUser();
    console.log("useeffect");
  }, []);

  const getUser = async () => {
    try {
      setInitialLoading(true);
      setError("");

      const accessToken = Cookies.get("accessToken");

      if (!accessToken) return;

      const response = await axios.get("http://localhost:8000/auth/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user } = response.data;

      setUser(user);
    } catch (err) {
      setError("REEEE");
    } finally {
      setInitialLoading(false);
    }
  };

  const signUp = async (email: string, name: string, password: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post("http://localhost:8000/auth/signup", { email, name, password });
      console.log(response);
    } catch (err) {
      if (err && err instanceof AxiosError) setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post("http://localhost:8000/auth/signin", { email, password });
      const { user, accessToken } = response.data;

      Cookies.set("accessToken", accessToken);

      setUser(user);
    } catch (err) {
      if (err && err instanceof AxiosError) setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
  };

  const value: AuthContextInterface = {
    user,
    loading,
    initialLoading,
    error,
    setError,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
