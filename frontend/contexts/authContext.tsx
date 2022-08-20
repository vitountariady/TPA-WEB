import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import useLocalStorage from "./useLocalStorage"

const UserContext = createContext(null as any);

export default function AuthContextProvider({children}:any){
    const [user,setUser] = useLocalStorage("credentials", {})

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(UserContext);
};

