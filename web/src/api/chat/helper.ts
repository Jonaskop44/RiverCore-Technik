import axios from "axios";
import { Constants } from "../constants";

export default class Helper {
  constructor() {}

  async createChat(tile: string) {
    const chat = await axios.post(`${Constants.API_BASE}/chat/create`, {
      title: tile,
    });

    return chat.data;
  }
}
