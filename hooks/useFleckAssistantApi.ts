import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useContext } from "react";
import {
  ErrorMessageContext,
  SetErrorMessageContext,
} from "../contexts/ErrorContext";
import { LoadingContext, SetLoadingContext } from "../contexts/LoadingContext";
import { ContactsResponse, ContactType } from "../types/contacts";
import { sortContactsByDate } from "../utils/contacts";
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
    shouldSetIsLoading?: boolean,
  ) => Promise<ResponseStructure<Type>> = async (
    request: AxiosRequestConfig,
    shouldSetIsLoading: boolean = true,
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
      if (shouldSetIsLoading) {
        setIsLoading(true);
      }
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
      if (shouldSetIsLoading) {
        setIsLoading(false);
      }
      return response;
    }
  };

  const getContactsApi = async (
    filter: any | undefined = undefined,
    size: number = 10000,
    shouldSetIsLoading: boolean = true,
  ): Promise<Array<ContactType>> => {
    const baseUrl = getFleckAssistantEndpoint();
    const encodedJsonFilter = encodeURIComponent(JSON.stringify(filter));

    const response = await makeApiCall<ContactsResponse>(
      {
        url: `${baseUrl}/get-contacts?filter=${encodedJsonFilter}&size=${size}`,
        method: "get",
      },
      shouldSetIsLoading,
    );

    return response.data?.results ?? [];
  };

  const getContactByIdApi = async (
    id: string,
    shouldSetIsLoading: boolean = true,
  ): Promise<ContactType> => {
    const baseUrl = getFleckAssistantEndpoint();

    const response = await makeApiCall<ContactType>(
      {
        url: `${baseUrl}/get-contacts/${id}`,
        method: "get",
      },
      shouldSetIsLoading,
    );

    return response.data ?? ({} as ContactType);
  };

  const updateContactApi = async (
    id: string,
    updatedFields: any,
    shouldSetIsLoading: boolean = true,
  ): Promise<ContactType> => {
    const baseUrl = getFleckAssistantEndpoint();

    const response = await makeApiCall<ContactType>(
      {
        url: `${baseUrl}/update-contact/${id}`,
        method: "put",
        data: updatedFields,
      },
      shouldSetIsLoading,
    );

    return response.data ?? ({} as ContactType);
  };

  const searchContacts = async (value: string) => {
    const hasDigitRegex = /\d+/g;
    const hasDigit = value.match(hasDigitRegex);

    const firstNameFilter = {
      must: [
        {
          regexp: {
            first_name: `.*${value}.*`,
          },
        },
      ],
    };

    const lastNameFilter = {
      must: [
        {
          regexp: {
            first_name: `.*${value}.*`,
          },
        },
      ],
    };

    const displayNameFilter = {
      must: [
        {
          regexp: {
            display_name: `.*${value}.*`,
          },
        },
      ],
    };

    const phoneNumberFilter = {
      must: [
        {
          regexp: {
            home_phone: `.*${value}.*`,
          },
        },
      ],
    };

    const addressFilter = {
      must: [
        {
          regexp: {
            address_line1: `.*${value}.*`,
          },
        },
      ],
    };

    const cityFilter = {
      must: [
        {
          regexp: {
            city: `.*${value}.*`,
          },
        },
      ],
    };

    let allContacts = [];
    if (hasDigit) {
      const phoneNumberResponse = await getContactsApi(
        phoneNumberFilter,
        10,
        false,
      );
      const addressResponse = await getContactsApi(addressFilter, 10, false);
      allContacts = [...phoneNumberResponse, ...addressResponse];
    } else {
      const firstNameResponse = await getContactsApi(
        firstNameFilter,
        10,
        false,
      );
      const lastNameResponse = await getContactsApi(lastNameFilter, 10, false);
      const displayNameResponse = await getContactsApi(
        displayNameFilter,
        10,
        false,
      );
      const addressResponse = await getContactsApi(addressFilter, 10, false);
      const cityResponse = await getContactsApi(cityFilter, 10, false);
      allContacts = [
        ...firstNameResponse,
        ...lastNameResponse,
        ...displayNameResponse,
        ...addressResponse,
        ...cityResponse,
      ];
    }

    // const uniqueContacts = Array.from(new Set(allContacts));
    const uniqueContacts = [];
    allContacts.forEach((contact) => {
      if (!uniqueContacts.find((c) => c.jnid === contact.jnid)) {
        uniqueContacts.push(contact);
      }
    });

    return sortContactsByDate(uniqueContacts);
  };

  return {
    getContactsApi,
    getContactByIdApi,
    updateContactApi,
    searchContacts,
    isLoading,
    errorMessage,
  };
};
