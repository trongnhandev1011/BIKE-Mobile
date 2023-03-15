import { useToast } from "native-base";
import React, { createContext, useEffect, useState } from "react";
import { getApiErrorMessage } from "../../utils/ErrorUtils";

interface IErrorProviderProps {
  children: any;
}

export const ErrorContext = createContext<{
  setErrorMsg: React.Dispatch<
    React.SetStateAction<{
      code: number;
      message: string;
    }>
  >;
}>({
  setErrorMsg: () => {},
});

export default function ErrorProvider({ children }: IErrorProviderProps) {
  const [errorMsg, setErrorMsg] = useState({
    code: 0,
    message: "",
  });
  const toast = useToast();

  useEffect(() => {
    if (!toast.isActive(errorMsg.code) && errorMsg.code)
      toast.show({
        id: errorMsg.code,
        title: getApiErrorMessage(errorMsg.code, errorMsg.message),
        style: {
          backgroundColor: "#F44336",
        },
      });
  }, [errorMsg]);

  return (
    <>
      <ErrorContext.Provider value={{ setErrorMsg: setErrorMsg }}>
        {children}
      </ErrorContext.Provider>
    </>
  );
}
