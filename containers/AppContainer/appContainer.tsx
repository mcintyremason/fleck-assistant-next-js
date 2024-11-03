import { UserProvider } from "@auth0/nextjs-auth0/client";
import React, { createContext } from "react";
import { ErrorContextProvider } from "../../contexts/ErrorContext";
import { LoadingContextProvider } from "../../contexts/LoadingContext";

type AppContainerProps = {
  children: React.ReactElement[] | React.ReactElement;
};

export type AppContextType = {};

export const AppContext = createContext<AppContextType>({});

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const appContextValue = {};

  return (
    <UserProvider>
      <AppContext.Provider value={appContextValue}>
        <LoadingContextProvider>
          <ErrorContextProvider>{props.children}</ErrorContextProvider>
        </LoadingContextProvider>
      </AppContext.Provider>
    </UserProvider>
  );
};

export default AppContainer;
