import axios, { AxiosInstance } from "axios";

export default class JobNimbusApi {
  private jobnimbusAxiosInstance: AxiosInstance;

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

  async getContacts(filter: string | undefined, size: number = 10000) {
    try {
      let response = undefined;

      const encodedJsonFilter = encodeURIComponent(filter);

      if (filter) {
        response = await this.jobnimbusAxiosInstance.get(
          `/api1/contacts?filter=${encodedJsonFilter}&size=${size}`,
        );
      } else {
        response = await this.jobnimbusAxiosInstance.get(
          `/api1/contacts?size=${size}`,
        );
      }

      if (response) {
        return response;
      } else {
        throw Error("Error: Response not valid");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getContactById(id: string) {
    try {
      let response = undefined;

      if (id) {
        response = await this.jobnimbusAxiosInstance.get(
          `/api1/contacts/${id}`,
        );
      } else {
        throw Error("Error: ID Required");
      }

      if (response) {
        return response;
      } else {
        throw Error("Error: Response not valid");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateContact(id: string, updatedFields: any) {
    try {
      let response = undefined;

      if (id) {
        response = await this.jobnimbusAxiosInstance.put(
          `/api1/contacts/${id}`,
          updatedFields,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        throw Error("Error: ID Required");
      }

      if (response) {
        return response;
      } else {
        throw Error("Error: Response not valid");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
