import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../contexts/authContext'
import { RefetchContext } from '../../contexts/refetcher'
import { acceptConnect, getUserByID, getUserExperience } from '../../queries/queries'

export default function ConnectRequest(parameter:any) {
    const [UserExperiences, setUserExperiences] = useState([])
    const [User, setUser] = useState({
        id:"",
        first_name: "",
        last_name: "",
        profile_picture_url: "https://firebasestorage.googleapis.com/v0/b/linkhedin-vt.appspot.com/o/profilePictures%2Fdefault.jpg?alt=media&token=140c66e3-a51d-47ae-aaef-00ad043d2bd0"
    })

    const userContext = UserAuth();
    const refetchContext = RefetchContext();

    const user = useQuery(getUserByID,{variables:{UserID: parameter.id}})
    const experience = useQuery(getUserExperience,{variables:{UserID:parameter.id}})
    const [acceptConnection] = useMutation(acceptConnect, {variables:{id: userContext.user.id, sender: parameter.id}})

    useEffect(() => {
        if(!experience.loading && !experience.error){
          setUserExperiences(experience.data.userExperience)
        }
      }, [experience.loading,experience.data])

    useEffect(()=>{
        if(!user.loading && !user.error){
          setUser(user.data.getUser)
        }
      },[user.loading,user.data])

    const accept = () =>{
        acceptConnection().then((x)=>{
            console.log(x)
            refetchContext.refetchUser();
        })
    }

    return (
        <div className='w-full border-sering-pake mv-20 flex-row space-between'>
            <img className='profile-picture-small p-10' src={User.profile_picture_url} alt=""/>
            <div className='w-80 space-between flex-row'>
                <div className='flex-col'>
                    <p className='text-black bold text-m'>{User.first_name}</p>
                    {UserExperiences.map((experience:any)=>{
                        if(experience.Active){
                            console.log(experience);
                            return(
                                <p key={experience.ID} className='text-black text-s'>{experience.Description} at {experience.CompanyName}</p>
                            )
                        }
                    })}
                </div>
                <div className='flex-row mh-10'>
                    <button onClick={accept} className='red-button-smaller text-white mh-10'>Accept</button>
                    <button className='blue-button-smaller text-white'>Ignore</button>
                </div>
            </div>
        </div>
    )
}
