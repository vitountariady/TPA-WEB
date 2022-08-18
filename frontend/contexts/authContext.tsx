import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";

const UserContext = createContext(null as any);

export default function AuthContextProvider({children}:any){
    const [user,setUser] = useState(Object);
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(UserContext);
};