import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../contexts/authContext'
import Navbar from '../Components/Navbar'
import { getDownloadURL, getStorage,ref, uploadBytes } from "firebase/storage";
import {storage} from "../../firebase.config"
import { useMutation, useQuery } from '@apollo/client';
import { getUserEducation, uploadProfilePicture } from '../../queries/userQueries';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateEducationModal from '../Components/CreateEducationModal';

export default function ProfilePage() {
  const userContext = UserAuth();
  console.log(userContext.user)
  const [uploadProfile] = useMutation(uploadProfilePicture)
  const [EducationModal, setEducationModal] = useState(false);
  const [UserEducations, setUserEducations] = useState([])
  const {data,loading,error} = useQuery(getUserEducation,{variables:{UserID:userContext.user.id}})

  useEffect(() => {
    console.log(error)
    if(!loading && !error){
      console.log(data)
      setUserEducations(data)
    }
  }, [loading])
  

  const toggleCreateModal = () =>{
    setEducationModal(!EducationModal)
  }

  useEffect(() => {
    if(EducationModal === true){
        document.body.style.overflow="hidden";
    }else{
        document.body.style.overflow = "visible"
    }
}, [EducationModal])
  
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
        {EducationModal === true && (
          <CreateEducationModal toggle={toggleCreateModal}></CreateEducationModal>
        )}
        <Navbar></Navbar>
        <div className='profile'>
            <label htmlFor="file">
              <img className='profile-picture' src={userContext.user.profile_picture} alt="" />
            </label>
            <p className='text-black mv-20 text-xl'>{userContext.user.first_name}  {userContext.user.last_name}</p>
            <p className='text-black mb-20 text-m'>Description</p>
            <input type="file" name='file' id='file' className='invisible' onChange={(e)=>{handleFileChange(e)}}/>
        </div>
        <div className='profile'>
          <div className='flex-row w-full space-between'>
            <p className='text-black text-l bold'>Education</p>
            <button className='add-button' onClick={toggleCreateModal}>
              <AiOutlinePlus className='plus-logo' ></AiOutlinePlus>
            </button>
          </div>
        </div>
    </div>
  )
}
