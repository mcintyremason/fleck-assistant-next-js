import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getFleckAssistantEndpoint } from "../utils/env";

export interface ResponseStructure<Type> {
  isLoaded: boolean;
  data?: Type | null;
  hasError: boolean;
  errorMessage: string;
  status: number;
  url?: string;
}

export const useFleckAssistantApi = () => {
  const makeApiCall: <Type>(
    request: AxiosRequestConfig,
    timeout?: number,
  ) => Promise<ResponseStructure<Type>> = async (
    request: AxiosRequestConfig,
  ) => {
    let response: ResponseStructure<any> = {
      hasError: false,
      data: null,
      errorMessage: "",
      isLoaded: false,
      status: null,
      url: "",
    };

    try {
      const axiosResponse: AxiosResponse = await axios(request).catch(
        (error: AxiosError) => {
          console.error(error.message, error.response);
          // Setting the error manually as external response obj does not have it
          response.errorMessage = `${error.message}. Please contact Support for help.`;
          return error.response;
        },
      );

      response.url = axiosResponse?.request.responseURL;
      response.data = axiosResponse?.data;
      response.status = axiosResponse?.status;
      response.hasError = axiosResponse?.status > 299;
      response.isLoaded = true;

      if (response.hasError) {
        console.error(response.errorMessage);
      }
    } catch (e) {
      console.error(e);
      console.error(response.errorMessage);
    } finally {
      return response;
    }
  };

  const getContactsApi = async () => {
    const baseUrl = getFleckAssistantEndpoint();

    const response = await makeApiCall<any>({
      url: `${baseUrl}/get-contacts`,
      method: "get",
    });

    return response.data;
  };

  return { getContactsApi };
};
