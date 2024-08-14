import axios from "axios";
import { Constants } from "../constants";

export default class Helper {
  constructor() {}

  async getAllAcceptedReviews() {
    return axios
      .get(`${Constants.API_BASE}/author/reviews`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { status: false };
      });
  }
}
