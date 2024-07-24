import { Auth } from "./auth";

export default class Client {
  auth: Auth;
  constructor() {
    this.auth = new Auth();
  }
}
