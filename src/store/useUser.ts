import { create } from "zustand";
import { UserData } from "../interfaces/user-interface";
interface Coordinates {
  lat: string | null;
  lng: string | null;
}
interface IUseUser {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  coordinates: {
    lat: string | null;
    lng: string | null;
  };
  setCoordinates: (coords: Coordinates) => void;

  login: (userData: UserData) => void;
  logout: () => void;
}

const storedData = localStorage.getItem("loginedAccount");
const parsed = storedData ? JSON.parse(storedData) : null;

const useUser = create<IUseUser>((set) => ({
  user: parsed,
  setUser: (user) => set({ user }),
  coordinates: {
    lat: null,
    lng: null,
  },
  setCoordinates: (coords) => set({ coordinates: coords }),

  login: (userData) => {
    set({ user: userData });
  },

  logout: () => {
    localStorage.removeItem("loginedAccount");
    set({ user: null });
  },
}));

export default useUser;
