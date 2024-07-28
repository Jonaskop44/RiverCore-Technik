import create from "zustand";
import { User } from "@/types/user";

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {},
  setUser: (user) => set({ user }),
}));
