import { useState, createContext, useContext, ReactNode } from "react";
import { User } from "../../../interfaces/User";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextInterface {
  user: User | null;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (email: string, name: string, password: string) => {
    await axios.post("http://localhost:8000/auth/signup", { email, name, password });
  };

  const signIn = async (email: string, password: string) => {
    await axios.post("http://localhost:8000/auth/signin", { email, password });
  };

  const value: AuthContextInterface = {
    user,
    signUp,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
