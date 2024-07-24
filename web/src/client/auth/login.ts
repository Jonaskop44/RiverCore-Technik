import { Constants } from "../constants";

export default class Login {
  constructor() {}

  public async post(email: string, password: string) {
    try {
      const response = await fetch(`${Constants.API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok)
        return { status: false, message: "Invalid Credentials" };
      const data = await response.json();
      return { status: true, data, message: "Login sucessfully" };
    } catch (err) {
      console.log(err);
    }
  }
}
