import { useQuery } from '@apollo/client'
import React, { createContext, useContext, useEffect } from 'react'
import { getUserByID } from '../queries/queries';
import { UserAuth } from './authContext'

const Refetcher = createContext(null as any);

export default function RefetchContextProvider({children}:any){
    const userContext = UserAuth();
    const userFromDB = useQuery(getUserByID,{variables:{UserID: userContext.user.id}})

    const refetchUser = () =>{
        userFromDB.refetch().then((x)=>{
            userContext.setUser(x.data.getUser)
        })
    }

    // useEffect(() => {
    //     userFromDB.refetch().then((x)=>{
    //         userContext.setUser(x.data)
    //     })
    // }, [userFromDB.data])
    

    return(
        <Refetcher.Provider value={{refetchUser}}>
            {children}
        </Refetcher.Provider>
    )
}

export const RefetchContext = ()=>{
    return useContext(Refetcher);
};
