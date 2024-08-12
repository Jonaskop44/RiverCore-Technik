import axios from "axios";
import { Constants } from "../constants";

export default class Helper {
  constructor() {}

  async delteProfilePicture() {
    return await axios
      .delete(`${Constants.API_BASE}/upload/profilePicture`)
      .then((response) => {
        if (response.status !== 200) return { status: false };
        return { status: true };
      })
      .catch((error) => {
        return { status: false };
      });
  }
}
