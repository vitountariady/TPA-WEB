import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../contexts/authContext'
import { RefetchContext } from '../../contexts/refetcher';
import { getUserByID } from '../../queries/queries';
import ConnectRequest from '../Components/ConnectRequest';
import Navbar from '../Components/Navbar'

export default function MyNetwork() {
    const userContext= UserAuth();
    const refetchContext= RefetchContext();
    
    useEffect(() => {
        refetchContext.refetchUser();
    }, [])
    
    return (
        <div className='beige-bg fullscreen center-col'>
            <Navbar></Navbar>
            <div className='flex-col main-container white-bg'>
                <p className='text-black text-l bold mh-10'>Invitations</p>
                {userContext.user.connect_request.length==0 && (
                    <p className='text-black text-s w-full mv-20'>Empty</p>
                    )
                }
                {userContext.user.connect_request.map((req:any)=>{
                    return(
                        <ConnectRequest key={req} id={req}></ConnectRequest>
                    )
                })}
            </div>
        </div>
    )
}
