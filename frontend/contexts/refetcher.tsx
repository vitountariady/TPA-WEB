import { useQuery } from '@apollo/client'
import React, { createContext, useContext } from 'react'
import { getUserByID } from '../queries/queries';
import { UserAuth } from './authContext'

const Refetcher = createContext(null as any);

export default function RefetchContextProvider({children}:any){
    const userContext = UserAuth();
    const userFromDB = useQuery(getUserByID,{variables:{UserID: userContext.user.id}})

    const refetchUser = () =>{
        userFromDB.refetch().then((x)=>{
            console.log(x);
            userContext.setUser(x.data.getUser)
        })
    }

    return(
        <Refetcher.Provider value={{refetchUser}}>
            {children}
        </Refetcher.Provider>
    )
}

export const RefetchContext = ()=>{
    return useContext(Refetcher);
};
