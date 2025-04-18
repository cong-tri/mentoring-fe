import React, { createContext } from "react";

type DataMainContext = {
  token: string;
};

export const MainContext = createContext({} as { data: DataMainContext });

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainContext.Provider
      value={{
        data: {
          token: "",
        },
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => React.useContext(MainContext);
