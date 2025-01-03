import axios from "axios";
import { Constants } from "../constants";

export default class Helper {
  constructor() {}

  async createReview(title: string, rating: number, content: string) {
    return axios
      .post(`${Constants.API_BASE}/author/review/create`, {
        title: title,
        rating: rating,
        content: content,
      })
      .then((response) => {
        if (response.status !== 201) return { status: false, data: null };
        return { status: true, data: response.data };
      })
      .catch((error) => {
        return { status: false, data: null };
      });
  }

  async getAllAcceptedReviews() {
    return axios
      .get(`${Constants.API_BASE}/author/reviews`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { status: false };
      });
  }

  async getAllReviews() {
    return axios
      .get(`${Constants.API_BASE}/admin/reviews`)
      .then((response) => {
        if (response.status !== 200) return { status: false, data: null };

        return { status: true, data: response.data };
      })
      .catch((error) => {
        return { status: false, data: null };
      });
  }

  async updateReviewStatus(reviewId: number, status: string) {
    return axios
      .patch(`${Constants.API_BASE}/admin/review/update/${reviewId}`, {
        status: status,
      })
      .then((response) => {
        if (response.status !== 200) return { status: false, data: null };

        return { status: true, data: response.data };
      })
      .catch((error) => {
        return { status: false, data: null };
      });
  }

  async updateAuthor(authorId: number) {
    return axios
      .patch(`${Constants.API_BASE}/admin/author/update/${authorId}`)
      .then((response) => {
        if (response.status !== 200) return { status: false, data: null };

        return { status: true, data: response.data };
      })
      .catch((error) => {
        return { status: false, data: null };
      });
  }
}
