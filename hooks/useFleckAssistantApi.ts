import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useContext } from "react";
import {
  ErrorMessageContext,
  SetErrorMessageContext,
} from "../contexts/ErrorContext";
import { LoadingContext, SetLoadingContext } from "../contexts/LoadingContext";
import { ContactsResponse, ContactType } from "../types/contacts";
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
  // TODO: Find way to separate multiple calls to API
  // isLoading has unexpected behavior if two calls are made to API in short succession
  const isLoading = useContext(LoadingContext);
  const setIsLoading = useContext(SetLoadingContext);
  const errorMessage = useContext(ErrorMessageContext);
  const setErrorMessage = useContext(SetErrorMessageContext);

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
      setIsLoading(true);
      const axiosResponse: AxiosResponse = await axios(request).catch(
        (error: AxiosError) => {
          console.error(error.message, error.response);
          // Setting the error manually as external response obj does not have it
          response.errorMessage = `Please contact Support for help - ${error.message}`;
          return error.response;
        },
      );

      response.url = axiosResponse?.request.responseURL;
      response.data = axiosResponse?.data;
      response.status = axiosResponse?.status;
      response.hasError = axiosResponse?.status > 399;
      response.isLoaded = true;

      if (response.hasError) {
        setErrorMessage(response.errorMessage);
        console.error(response.errorMessage);
      }
    } catch (e) {
      setErrorMessage(response.errorMessage);
      console.error(e);
      console.error(response.errorMessage);
    } finally {
      setIsLoading(false);
      return response;
    }
  };

  const getContactsApi = async (
    filter: any | undefined = undefined,
  ): Promise<Array<ContactType>> => {
    const baseUrl = getFleckAssistantEndpoint();
    const encodedJsonFilter = encodeURIComponent(JSON.stringify(filter));

    const response = await makeApiCall<ContactsResponse>({
      url: `${baseUrl}/get-contacts?filter=${encodedJsonFilter}`,
      method: "get",
    });

    return response.data?.results ?? [];
  };

  const getContactByIdApi = async (id: string): Promise<ContactType> => {
    const baseUrl = getFleckAssistantEndpoint();

    const response = await makeApiCall<ContactType>({
      url: `${baseUrl}/get-contacts/${id}`,
      method: "get",
    });

    return response.data ?? ({} as ContactType);
  };

  const updateContactApi = async (
    id: string,
    updatedFields: any,
  ): Promise<ContactType> => {
    const baseUrl = getFleckAssistantEndpoint();

    const response = await makeApiCall<ContactType>({
      url: `${baseUrl}/update-contact/${id}`,
      method: "put",
      data: updatedFields,
    });

    return response.data ?? ({} as ContactType);
  };

  return {
    getContactsApi,
    getContactByIdApi,
    updateContactApi,
    isLoading,
    errorMessage,
  };
};
