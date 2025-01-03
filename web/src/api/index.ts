import axios from "axios";
import { Auth } from "./auth";
import { Mail } from "./mail";
import { User } from "./user";
import Cookies from "js-cookie";
import { Upload } from "./upload";
import { Reviews } from "./reviews";
import { Chat } from "./chat";

export default class ApiClient {
  auth: Auth;
  mail: Mail;
  user: User;
  upload: Upload;
  reviews: Reviews;
  chat: Chat;
  constructor() {
    this.auth = new Auth();
    this.mail = new Mail();
    this.user = new User();
    this.upload = new Upload();
    this.reviews = new Reviews();
    this.chat = new Chat();

    axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
      "accessToken"
    )}`;
  }
}
