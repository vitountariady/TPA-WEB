import React from 'react'
import { UserAuth } from '../../contexts/authContext'
import Navbar from '../Components/Navbar'
import { getDownloadURL, getStorage,ref, uploadBytes } from "firebase/storage";
import {storage} from "../../firebase.config"
import { useMutation } from '@apollo/client';
import { uploadProfilePicture } from '../../queries/userQueries';

export default function ProfilePage() {
  const userContext = UserAuth();
  console.log(userContext.user)
  const [uploadProfile] = useMutation(uploadProfilePicture)
  
  const handleFileChange = async(e:any) =>{
    const file = e.target.files[0]
    const imageRef= ref(storage, 'profilePictures/'+ file.name)
    uploadBytes(imageRef, file).then(()=>{
      getDownloadURL(imageRef).then((x)=>{
        uploadProfile({variables:{
          id: userContext.user.id,
          newProfilePicture: x
        }})
        const updatedUser = userContext.user
        updatedUser.profile_picture = x
        console.log(updatedUser);
        userContext.setUser(updatedUser)
      })
    })
  }

  return (
    <div className='white-bg fullscreen center-col'>
        <Navbar></Navbar>
        <div className='profile'>
            <img className='profile-picture' src={userContext.user.profile_picture} alt="" />
            <p className='text-black mv-20 text-l'>{userContext.user.first_name}  {userContext.user.last_name}</p>
            <p className='text-black mb-20 text-s'>Description</p>
            <input type="file" name='file' id='file' onChange={(e)=>{handleFileChange(e)}}/>
        </div>
    </div>
  )
}
