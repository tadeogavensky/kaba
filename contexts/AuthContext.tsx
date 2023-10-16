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
import Address from "@/types/Address";
import Worker from "@/types/Worker";
import Client from "@/types/Client";
import  User  from "@/types/User";

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

  // Function to log in a user (you can modify this)
  const login = (userData: User) => {
    if (userData.id) {
      Cookies.set("user", userData.id);
      setUser(userData);
    } else {
      // Manejar el caso en el que userData.id es undefined
    }
  };

  // Function to log out the user
  const logout = () => {
    Cookies.remove("user");
    setUser(null);
    router.refresh();
  };

  const updateSession = (newUser: User) => {
    setUser((prevState) => ({ ...prevState, ...newUser }));
  };

  // Check if a user is already logged in when the app starts
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
