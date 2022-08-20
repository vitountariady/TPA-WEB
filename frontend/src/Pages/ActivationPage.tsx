import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Activate, GetLink } from '../../queries/userQueries'

export default function ActivationPage() {
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
            const userid = data.getLink.userID
            activate({variables:{id:userid}}).then(()=>{
                console.log("success")
                navigate('/')
            })
        }
    }, [loading])

    return (
        <div></div>
    )
}
