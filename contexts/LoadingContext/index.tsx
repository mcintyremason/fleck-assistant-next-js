import { createContext, useState } from "react";

export const LoadingContext = createContext(null);
export const SetLoadingContext = createContext(null);

type LoadingContextProps = {
  children?: React.ReactNode;
};

export const LoadingContextProvider: React.FC<LoadingContextProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={isLoading}>
      <SetLoadingContext.Provider value={setIsLoading}>
        {children}
      </SetLoadingContext.Provider>
    </LoadingContext.Provider>
  );
};
