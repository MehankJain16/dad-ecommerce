import React, { useContext, useEffect, useState } from "react";
import { Global } from "../types/Global";

const GlobalContext = React.createContext<Partial<Global>>({});

export const useGlobal = () => {
  return useContext(GlobalContext);
};

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(true);

  // Mobile Screen Size
  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);

    window.addEventListener("resize", (e: any) => {
      setIsSmallScreen(e.target.innerWidth < 768);
    });

    return () => {
      window.removeEventListener("resize", (e: any) => {
        setIsSmallScreen(e.target.innerWidth < 768);
      });
    };
  }, [isSmallScreen]);

  const value: Global = {
    isSmallScreen: isSmallScreen,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
