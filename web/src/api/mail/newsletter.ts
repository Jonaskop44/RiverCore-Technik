import axios from "axios";
import { Constants } from "../constants";

export class Newsletter {
  constructor() {}

  public async subscribe(email: string) {
    return axios
      .post(`${Constants.API_BASE}/mail/newsletter/subscribe`, {
        email: email,
      })
      .then((response) => {
        if (response.status !== 201) {
          return { status: false };
        }

        return { status: true };
      })
      .catch((error) => {
        return {
          status: false,
        };
      });
  }
}
