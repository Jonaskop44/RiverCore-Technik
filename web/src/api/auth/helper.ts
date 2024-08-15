import axios from "axios";
import { Constants } from "../constants";

export default class Helper {
  constructor() {}

  public async activateUser(token: string) {
    try {
      const response = await axios.post(`${Constants.API_BASE}/user/activate`, {
        token: token,
      });

      if (response.status !== 201)
        return { status: false, message: "The token is invalid or expired" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "User activated successfully",
      };
    } catch (error) {
      return { status: false, message: "Something went wrong!" };
    }
  }

  public async checkPasswordRestToken(token: string) {
    try {
      const response = await axios.post(
        `${Constants.API_BASE}/user/password/check/restToken`,
        {
          token: token,
        }
      );

      if (response.status !== 201) {
        return { status: false, message: "Invalid token" };
      }

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Token verified successfully",
      };
    } catch (err) {
      return { status: false, message: "Something went wrong" };
    }
  }

  public async resendActivationEmail(email: string) {
    try {
      const response = await axios.post(
        `${Constants.API_BASE}/user/activate/resend`,
        { email: email }
      );

      if (response.status !== 201)
        return { status: false, message: "User not found" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Activation email sent successfully",
      };
    } catch (error) {
      return { status: false, message: "Something went wrong!" };
    }
  }

  public async sendPasswordResetEmail(email: string) {
    try {
      const response = await axios.post(
        `${Constants.API_BASE}/user/password/resend`,
        { email: email }
      );

      if (response.status !== 201)
        return { status: false, message: "User not found" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Password reset email sent successfully",
      };
    } catch (error) {
      return { status: false, message: "Something went wrong!" };
    }
  }

  public async resetPassword(email: string, password: string, token: string) {
    try {
      const response = await axios.patch(
        `${Constants.API_BASE}/user/password/reset`,
        {
          email: email,
          password: password,
          token: token,
        }
      );

      if (response.status !== 201)
        return { status: false, message: "Invalid token" };

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Password reset successfully",
      };
    } catch (error) {
      return { status: false, message: "Something went wrong!" };
    }
  }

  public async verifyToken(token: string) {
    try {
      const response = await axios.post(`${Constants.API_BASE}/auth/verify`, {
        token: token,
      });

      if (response.status !== 201) {
        return { status: false, message: "Invalid token" };
      }

      const data = await response.data;
      return {
        status: true,
        data: data,
        message: "Token verified successfully",
      };
    } catch (err) {
      return { status: false, message: "Something went wrong" };
    }
  }
}
