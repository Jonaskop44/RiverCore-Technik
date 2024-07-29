import create from "zustand";
import { User } from "@/types/user";
import { Constants } from "@/api/constants";
import axios from "axios";
import Cookies from "js-cookie";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      throw new Error("No token found");
    }

    await axios
      .get(`${Constants.API_BASE}/user/token/data/${token}`)
      .then((response) => {
        if (response.status !== 200) {
          return { status: false, data: null, message: "User not found" };
        }

        const data = response.data;
        set({ user: data });
      })
      .catch((error) => {
        set({ user: null });
        return { status: false, data: null, message: "Something went wrong" };
      });
  },
}));
