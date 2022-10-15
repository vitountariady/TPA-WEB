import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UsersSearchTab(parameter:any) {
    const users = parameter.users
    const navigate = useNavigate();
    return (
        <div className='main-container white-bg center-col mv-20'>
            <p className='text-l text-black'>Users</p>
           {users.map((user:any)=>{
            return(
                <div onClick={()=>{navigate(`/profile/${user.id}`)}} className='w-80 border-sering-pake mv-10 flex-row space-around'>
                    <img className='profile-picture-small p-10' src={user.profile_picture_url} alt=""/>
                    <p className='text-black bold text-m text-center'>{user.first_name +" "+user.last_name}</p>
                </div>
            )
           })}
        </div>
    )
}
