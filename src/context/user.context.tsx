"use client";
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";


type User = {
  name: string;
  email: string;
  isAuthenticated: boolean;
};


type UserContextType = {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
  
};


const Context = createContext<UserContextType | undefined>({
    name: "",
    email: "",
    isAuthenticated: false,
  });


export function UserContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userInfo, setUserInfo] = useState<User>({
    name: "",
    email: "",
    isAuthenticated: false,
  });

  return (
    <Context.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </Context.Provider>
  );
}

export function useUserContext() {
  const context = useContext(Context);
 
  return context;
}
