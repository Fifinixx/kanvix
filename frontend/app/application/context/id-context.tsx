"use client";

import { useState, createContext, ReactNode, useContext } from "react";

type IdContextType = {
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const IdContext = createContext<IdContextType | undefined>(undefined);

export function IdContextProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | undefined>(undefined);

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
}

export function useId() {
  const context = useContext(IdContext);
  if (!context)
    throw new Error("useUser must be used inside <IdContextProvider>");
  return context;
}
