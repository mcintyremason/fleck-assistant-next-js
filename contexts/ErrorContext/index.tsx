import { createContext, useState } from "react";

export const ErrorMessageContext = createContext(null);
export const SetErrorMessageContext = createContext(null);

type ErrorContextProps = {
  children?: React.ReactNode;
};

export const ErrorContextProvider: React.FC<ErrorContextProps> = ({
  children,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>(undefined);

  return (
    <ErrorMessageContext.Provider value={errorMessage}>
      <SetErrorMessageContext.Provider value={setErrorMessage}>
        {children}
      </SetErrorMessageContext.Provider>
    </ErrorMessageContext.Provider>
  );
};
