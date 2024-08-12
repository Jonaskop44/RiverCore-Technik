import axios from "axios";
import { Constants } from "../constants";

export default class Helper {
  constructor() {}

  async uploadProfilePicture(file: any) {
    await axios
      .post(`${Constants.API_BASE}/upload/profilePicture`, {
        data: "[formData]",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        return { status: false };
      });
  }
}
