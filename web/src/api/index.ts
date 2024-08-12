import axios from "axios";
import { Auth } from "./auth";
import { Mail } from "./mail";
import { User } from "./user";
import Cookies from "js-cookie";
import { Upload } from "./upload";

export default class ApiClient {
  auth: Auth;
  mail: Mail;
  user: User;
  upload: Upload;
  constructor() {
    this.auth = new Auth();
    this.mail = new Mail();
    this.user = new User();
    this.upload = new Upload();

    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "accessToken"
    )}`;
  }
}
