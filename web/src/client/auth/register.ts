import axios from "axios";
import { Constants } from "../constants";
import { User } from "@/types/user";

export default class Register {
  constructor() {}

  async post(user: User) {
    try {
      const response = await axios.post(`${Constants.API_BASE}/auth/register`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        designation: user.designation,
        companyName: user.companyName,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
