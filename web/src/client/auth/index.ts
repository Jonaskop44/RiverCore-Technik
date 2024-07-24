import Login from "./login";
import Register from "./register";

export class Auth {
  login: Login;
  signup: Register;
  constructor() {
    this.login = new Login();
    this.signup = new Register();
  }
}
