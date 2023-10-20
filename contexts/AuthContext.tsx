"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import User from "@/types/User";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateSession: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    if (userData.id) {
      Cookies.set("user", userData.id);
      Cookies.set("role", userData.role || "");

      if (userData.role == "worker") {
        console.log("es worker", userData.worker);
        setUser({ ...userData, worker: userData.worker });
      } else if (userData.role == "client") {
        console.log("es cliente");
        setUser({ ...userData, client: userData.client });
      } else {
        setUser(userData);
      }
    } else {
      return null;
    }
  };

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
    router.refresh();
  };

  const updateSession = (newUser: User) => {
    setUser((prevState) => ({ ...prevState, ...newUser }));
  };

  useEffect(() => {
    const userCookie = Cookies.get("user");

    const fetchUser = async () => {
      const res = await axios.get(`/api/me`);
      setUser(res.data);
    };

    if (userCookie) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
