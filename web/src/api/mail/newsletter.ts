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

  public async unsubscribe(mailID: string) {
    return axios
      .delete(`${Constants.API_BASE}/mail/newsletter/unsubscribe`, {
        data: {
          mailID: mailID,
        },
      })
      .then((response) => {
        if (response.status !== 200) return { status: false };

        return { status: true };
      })
      .catch((error) => {
        return { status: false };
      });
  }

  public async getMailIDInfo(mailID: string) {
    return axios
      .get(`${Constants.API_BASE}/mail/newsletter/info/${mailID}`)
      .then((response) => {
        if (response.status !== 200) return { status: false, data: null };

        return { status: true, data: response.data };
      })
      .catch((error) => {
        return {
          data: null,
          status: false,
        };
      });
  }

  public async sendNewsletter(email: string, subject: string, content: string) {
    return axios
      .post(`${Constants.API_BASE}/admin/newsletter/send`, {
        email: email,
        subject: subject,
        content: content,
      })
      .then((response) => {
        if (response.status !== 201) return { status: false };

        return { status: true };
      })
      .catch((error) => {
        return { status: false };
      });
  }

  public async getAllNewsletterSubscribers() {
    return axios
      .get(`${Constants.API_BASE}/admin/newsletter/subscribers`)
      .then((response) => {
        if (response.status !== 200) return { status: false, data: null };

        return { status: true, data: response.data };
      })
      .catch((error) => {
        return {
          data: null,
          status: false,
        };
      });
  }
}
