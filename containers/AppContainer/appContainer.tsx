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
    <AppContext.Provider value={appContextValue}>
      <UserProvider>
        <LoadingContextProvider>
          <ErrorContextProvider>{props.children}</ErrorContextProvider>
        </LoadingContextProvider>
      </UserProvider>
    </AppContext.Provider>
  );
};

export default AppContainer;
