import axios from "axios";
import { Constants } from "../constants";

export default class Helper {
  constructor() {}

  async activateUser(token: string) {
    try {
      const response = await axios.post(
        `${Constants.API_BASE}/user/activate/${token}`
      );

      if (response.status !== 201)
        return { status: false, message: "The token is invalid or expired" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "User activated successfully",
      };
    } catch (error) {
      return { status: false, message: "Somethind went wrong!" };
    }
  }
}
