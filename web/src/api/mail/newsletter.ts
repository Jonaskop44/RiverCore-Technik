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

  public async unsubscribe(email: string) {}

  public async getMailIDInfo(mailID: string) {
    return axios
      .get(`${Constants.API_BASE}/mail/newsletter/info/${mailID}`)
      .then((response) => {
        if (response.status !== 200) return { status: false };

        return { status: true, data: response.data };
      })
      .catch((error) => {
        return {
          status: false,
        };
      });
  }
}
