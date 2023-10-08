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

// Define the user type as per your user data structure.
interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  image?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  // Function to log in a user (you can modify this)
  const login = (userData: User) => {
    Cookies.set("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    // Remove the user cookie and set user state to null.
    Cookies.remove("user");
    setUser(null);
    router.refresh();
  };

  // Check if a user is already logged in when the app starts
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userData = JSON.parse(userCookie) as User;
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
