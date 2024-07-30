import { Auth } from "./auth";
import { Mail } from "./mail";

export default class ApiClient {
  auth: Auth;
  mail: Mail;
  constructor() {
    this.auth = new Auth();
    this.mail = new Mail();
  }
}
