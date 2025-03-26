import { createContext, useState, ReactNode, useContext } from "react";
import { UserData } from "../interfaces/user-interface";

interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isLoggedIn: boolean;
  coordinates: { lat: null | string; lng: null | string };
  setCoordinates: (value: { lat: null | string; lng: null | string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedData = localStorage.getItem("loginedAccount");
  const parsed = storedData ? JSON.parse(storedData) : null;

  const [user, setUser] = useState<UserData | null>(parsed);

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(user));
  const [coordinates, setCoordinates] = useState<{
    lat: string | null;
    lng: string | null;
  }>({
    lat: null,
    lng: null,
  });

  const login = (userData: UserData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("loginedAccount");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedIn, coordinates, setCoordinates }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
