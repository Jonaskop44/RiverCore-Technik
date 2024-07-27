import { Auth } from "./auth";

export default class ApiClient {
  auth: Auth;
  constructor() {
    this.auth = new Auth();
  }
}
