import { User } from "@/types/user";
import { Constants } from "../constants";
import axios from "axios";
import { useUserStore } from "@/data/userStore";

export default class Login {
  constructor() {}

  public async post(user: User) {
    // try {
    //   const response = await axios.post(`${Constants.API_BASE}/auth/login`, {
    //     email: user.email,
    //     password: user.password,
    //   });

    //   if (response.status !== 201)
    //     return { status: false, message: "Invalid Credentials" };
    //   const data = await response.data;

    //   const { setUser } = useUserStore.getState();
    //   setUser(data);

    //   return { status: true, data: data, message: "Login sucessfully" };
    // } catch (err) {
    //   return { status: false, message: "Something went wrong!" };
    // }

    return axios
      .post(`${Constants.API_BASE}/auth/login`, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.status !== 201)
          return { status: false, data: null, message: response.data.message };
        const data = response.data;

        const { setUser } = useUserStore.getState();
        setUser(data);

        return { status: true, data: data, message: "Login sucessfully" };
      })
      .catch((error) => {
        return {
          status: false,
          data: null,
          message: error.response.data.message,
        };
      });
  }
}
