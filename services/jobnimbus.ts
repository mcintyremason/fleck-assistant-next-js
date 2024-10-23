import axios from "axios";

export default class JobNimbusApi {
  private jobnimbusAxiosInstance;

  constructor() {
    if (!this.jobnimbusAxiosInstance) {
      this.jobnimbusAxiosInstance = axios.create({
        baseURL: "https://app.jobnimbus.com",
        headers: {
          Authorization: `Bearer ${process.env.JOBNIMBUS_API_KEY}`,
        },
      });
    }
  }

  async getContacts(size: number = 10000) {
    try {
      const response = await this.jobnimbusAxiosInstance.get(
        `/api1/contacts?size=${size}`,
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
