"use client";

import { useState, createContext, ReactNode, useContext } from "react";

type IdContextType = {
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
};
const IdContext = createContext<IdContextType | undefined>(undefined);

export function IdContextProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);

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
