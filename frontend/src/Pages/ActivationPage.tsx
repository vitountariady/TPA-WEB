import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Activate, GetLink } from '../../queries/queries'
import Error404Page from './Error404Page'

export default function ActivationPage() {
    const [Error, setError] = useState(false);
    const [activate] = useMutation(Activate)
    const linkid = useParams().id;
    const navigate = useNavigate();
    const {loading,error,data} = useQuery(GetLink,{
        variables:{
            id:linkid
        }
    })

    useEffect(() => {
        if(!loading){
            if(error){
                console.log(error)
                setError(true);
            }else{
                const userid = data.getLink.userID
                activate({variables:{id:userid}}).then(()=>{
                    console.log("success")
                    navigate('/')
                })
            }
        }
    }, [loading])

    return (
        <div>
            {Error===true && (
                <Error404Page></Error404Page>
            )}
        </div>
    )
}
