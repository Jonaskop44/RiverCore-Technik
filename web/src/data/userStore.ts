import create from "zustand";
import { User } from "@/types/user";
import { Constants } from "@/api/constants";
import axios from "axios";
import Cookies from "js-cookie";
import { headers } from "next/headers";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
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
    }
  },
  refreshToken: async () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken && refreshToken) {
      await axios
        .post(
          `${Constants.API_BASE}/auth/refresh-token`,
          {
            data: "[form]",
          },
          {
            headers: {
              Authorization: `Refresh ${refreshToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status !== 201) return { status: false };

          const data = response.data;
          Cookies.set("accessToken", data.accessToken);
        })
        .catch((error) => {
          return { status: false };
        });
    }
  },
}));
