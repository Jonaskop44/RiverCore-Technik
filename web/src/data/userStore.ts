import create from "zustand";
import { User } from "@/types/user";
import ApiClient from "@/api";

interface UserState {
  user: User;
  setUser: (user: User) => void;
  fetchUser: (token: string) => Promise<void>;
}

const apiClient = new ApiClient();

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async (token) => {
    const data = await apiClient.auth.helper.getUserDataFromToken(token);
    if (data.status) {
      set({ user: data.data });
    } else {
      set({ user: null });
    }
  },
}));
