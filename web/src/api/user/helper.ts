import axios from "axios";
import { Constants } from "../constants";

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
}
