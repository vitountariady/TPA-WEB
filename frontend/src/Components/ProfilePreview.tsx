import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserByID } from '../../queries/queries'

export default function ProfilePreview(parameter:any) {
    const user = useQuery(getUserByID,{variables:{UserID: parameter.id}})
    const navigate = useNavigate();
    return (
        <div className='PostPreview'>
        {user.loading &&(
            <p>Loading</p>
        ) }
        {!user.loading && (
            <div className='w-full h-full center-col'>
                 <div className='h-70 flex-row w-full' style={{borderBottom:"1px black solid"}}>
                    <img src={user.data.getUser.profile_picture_url} className="preview-picture mh-10" />
                    <p className='text-black mh-10'>{user.data.getUser.first_name +' ' + user.data.getUser.last_name}</p>
                </div>
                <div className='center-col w-full p-10 text-special' style={{cursor:"pointer"}}>
                    <p onClick={()=>{navigate('/profile/'+ user.data.getUser.id)}}>View Profile</p>
                </div>
                <div h->

                </div>
            </div>
        )}
        </div>
    )
}
