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

// Define the user type as per your user data structure.
interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  image?: string;
  phone?: string;
  identity?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  role?: string;
}

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
    Cookies.set("user", userData.id);
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    // Remove the user cookie and set user state to null.
    Cookies.remove("user");
    setUser(null);
    router.refresh();
  };

  const updateSession = (user: User) => {
    setUser(user);
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
