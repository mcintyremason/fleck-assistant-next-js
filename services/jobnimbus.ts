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

  async getContacts() {
    try {
      const response = await this.jobnimbusAxiosInstance.get("/api1/contacts");
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
