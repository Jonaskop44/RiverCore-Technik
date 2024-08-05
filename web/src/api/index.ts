import axios from "axios";
import { Auth } from "./auth";
import { Mail } from "./mail";
import { User } from "./user";
import Cookies from "js-cookie";

export default class ApiClient {
  auth: Auth;
  mail: Mail;
  user: User;
  constructor() {
    this.auth = new Auth();
    this.mail = new Mail();
    this.user = new User();

    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "accessToken"
    )}`;
  }
}
