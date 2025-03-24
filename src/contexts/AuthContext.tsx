import { createContext, useState, ReactNode, useContext } from "react";
import { UserData } from "../interfaces/user-interface";

interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const login = (userData: UserData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(user));
  console.log(isLoggedIn);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
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
