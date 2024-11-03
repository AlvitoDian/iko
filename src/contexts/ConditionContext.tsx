import React, { createContext, useContext, useState, ReactNode } from "react";

type FireworksContextType = {
  isOpenFireworks: boolean;
  toggleFireworks: () => void;
};

const FireworksContext = createContext<FireworksContextType | undefined>(
  undefined
);

export const FireworksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpenFireworks, setIsOpenFireworks] = useState(false);

  const toggleFireworks = () => {
    setIsOpenFireworks((prev) => !prev);
  };

  return (
    <FireworksContext.Provider value={{ isOpenFireworks, toggleFireworks }}>
      {children}
    </FireworksContext.Provider>
  );
};

export const useFireworks = () => {
  const context = useContext(FireworksContext);
  if (!context) {
    throw new Error("useFireworks must be used within a FireworksProvider");
  }
  return context;
};
