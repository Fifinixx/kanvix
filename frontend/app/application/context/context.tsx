"use client";

import {
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";



type IdContextType = {
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
};
const UserContext = createContext<IdContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | undefined>(undefined);

  return (
    <UserContext.Provider value={{ id, setId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useId() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used inside <UserContextProvider>");
  return context;
}
