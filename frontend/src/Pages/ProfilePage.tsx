import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../contexts/authContext'
import Navbar from '../Components/Navbar'
import { getDownloadURL, getStorage,ref, uploadBytes } from "firebase/storage";
import {storage} from "../../firebase.config"
import { useMutation, useQuery } from '@apollo/client';
import { getUserByID, getUserEducation, uploadProfilePicture } from '../../queries/userQueries';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateEducationModal from '../Components/CreateEducationModal';
import Education from '../Components/Education';
import { useParams } from 'react-router-dom';
import Error404Page from './Error404Page';

export default function ProfilePage() {
  const userContext = UserAuth();
  const userID = useParams().id
  const [Error, setError] = useState(false)
  const [uploadProfile] = useMutation(uploadProfilePicture)
  const [EducationModal, setEducationModal] = useState(false);
  const [UserEducations, setUserEducations] = useState([])
  const [MyProfile, setMyProfile] = useState(false)
  const [User, setUser] = useState({
    id:"",
    first_name: "",
    last_name: "",
    profile_picture_url: "https://firebasestorage.googleapis.com/v0/b/linkhedin-vt.appspot.com/o/profilePictures%2Fdefault.jpg?alt=media&token=140c66e3-a51d-47ae-aaef-00ad043d2bd0"
  })

  const education = useQuery(getUserEducation,{variables:{UserID:User.id}})
  const user = useQuery(getUserByID,{variables:{UserID: userID}})
  useEffect(()=>{
    if(userID === userContext.user.id){
      setMyProfile(true)
    }
  },[])

  useEffect(() => {
    if(!education.loading && !education.error){
      setUserEducations(education.data.userEducation)
    }
  }, [education.loading,education.data])

  useEffect(()=>{
    if(user.error){
      setError(true);
    }
    if(!user.loading && !user.error){
      setError(false);
      setUser(user.data.getUser)
    }
  },[user.loading,user.data])
  

  const toggleCreateEducation = () =>{
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
        }}).then(()=>{
          user.refetch()
        })
        const updatedUser = userContext.user
        updatedUser.profile_picture = x
        userContext.setUser(updatedUser)
      })
    })
  }

  if(Error){
    return(
      <Error404Page></Error404Page>
    )
  }

  return (
    <div className='white-bg fullscreen center-col'>
        {EducationModal === true && (
          <CreateEducationModal refetch={education.refetch} toggle={toggleCreateEducation}></CreateEducationModal>
        )}
        <Navbar></Navbar>
        <div className='profile'>
            <label htmlFor="file">
              <img className='profile-picture' src={User.profile_picture_url} alt="" />
            </label>
            <p className='text-black mv-20 text-xl'>{User.first_name}  {User.last_name}</p>
            <p className='text-black mb-20 text-m'>Description</p>
            <input disabled={!MyProfile} type="file" name='file' id='file' className='invisible' onChange={(e)=>{handleFileChange(e)}}/>
        </div>

        <div className='profile'>
          <div className='flex-row w-full space-between'>
            <p className='text-black text-l bold mb-20'>Education</p>
            {MyProfile === true && (
            <button className='add-button' onClick={toggleCreateEducation}>
              <AiOutlinePlus className='plus-logo' ></AiOutlinePlus>
            </button>
            )}
          </div>
          {UserEducations.map((education:any)=>{
            return(
              <Education key={education.ID} education={education}></Education>
            )
          })}
        </div>
        <div className='profile'>
          <div className='flex-row w-full space-between'>
            <p className='text-black text-l bold mb-20'>Experiences</p>
            {MyProfile === true && (
            <button className='add-button' onClick={toggleCreateEducation}>
              <AiOutlinePlus className='plus-logo' ></AiOutlinePlus>
            </button>
            )}
          </div>
          {UserEducations.map((education:any)=>{
            return(
              <Education key={education.ID} education={education}></Education>
            )
          })}
        </div>
    </div>
  )
}
