import axios from "axios";
import { Constants } from "../constants";
import { User } from "@/types/user";

export default class Helper {
  constructor() {}

  async getAllUsers() {
    return axios
      .get(`${Constants.API_BASE}/admin/users`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { status: false };
      });
  }

  async deleteUser(id: number) {
    return axios
      .delete(`${Constants.API_BASE}/admin/user/delete/${id}`)
      .then((response) => {
        if (response.status !== 200) return { status: false };

        return { status: true };
      })
      .catch((error) => {
        return { status: false };
      });
  }

  async updateUser(id: number, data: User) {
    return axios
      .patch(`${Constants.API_BASE}/admin/user/update/${id}`, data)
      .then((response) => {
        if (response.status !== 200) return { status: false };

        return { status: true };
      })
      .catch((error) => {
        return { status: false };
      });
  }
}
