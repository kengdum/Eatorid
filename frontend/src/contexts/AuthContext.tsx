import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useCart } from "./CartContext";
import { User } from "../interfaces/User";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextInterface {
  user: User | null;
  initialLoading: boolean;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  initialLoading: true,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const { discardCart } = useCart();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setInitialLoading(true);

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
      console.log("err");
    } finally {
      setInitialLoading(false);
    }
  };

  const signUp = async (email: string, name: string, password: string) => {
    try {
      await axios.post("http://localhost:8000/auth/signup", { email, name, password });
    } catch (err) {
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/signin", { email, password });
      const { user, accessToken } = response.data;

      Cookies.set("accessToken", accessToken);
      setUser(user);
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    discardCart();
    setUser(null);
  };

  const value: AuthContextInterface = {
    user,
    initialLoading,
    signUp,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
