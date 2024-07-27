import { User } from "@/types/user";
import { Constants } from "../constants";
import axios from "axios";

export default class Login {
  constructor() {}

  public async post(user: User) {
    try {
      const response = await axios.post(`${Constants.API_BASE}/auth/login`, {
        email: user.email,
        password: user.password,
      });

      if (response.status !== 201)
        return { status: false, message: "Invalid Credentials" };
      const data = await response.data;
      return { status: true, data: data, message: "Login sucessfully" };
    } catch (err) {
      return { status: false, message: "Somethind went wrong!" };
    }
  }
}
