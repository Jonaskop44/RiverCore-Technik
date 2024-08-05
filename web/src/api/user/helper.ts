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
        console.error(error);
      });
  }
}
