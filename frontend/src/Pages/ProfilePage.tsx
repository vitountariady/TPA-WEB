import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../contexts/authContext'
import Navbar from '../Components/Navbar'
import { getDownloadURL, getStorage,ref, uploadBytes } from "firebase/storage";
import {storage} from "../../firebase.config"
import { useMutation, useQuery } from '@apollo/client';
import { getUserByID, getUserEducation, getUserExperience, requestConnect, uploadProfilePicture } from '../../queries/queries';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateEducationModal from '../Components/CreateEducationModal';
import Education from '../Components/Education';
import { useParams } from 'react-router-dom';
import Error404Page from './Error404Page';
import CreateExperienceModal from '../Components/CreateExperienceModal';
import Experience from '../Components/Experience';
import { RefetchContext } from '../../contexts/refetcher';

export default function ProfilePage() {
  const userContext = UserAuth();
  const userID = useParams().id
  const [Error, setError] = useState(false)
  const [uploadProfile] = useMutation(uploadProfilePicture)
  const [requestConnection] = useMutation(requestConnect)
  const [EducationModal, setEducationModal] = useState(false);
  const [ExperienceModal, setExperienceModal] = useState(false);
  const [UserEducations, setUserEducations] = useState([])
  const [UserExperiences, setUserExperiences] = useState([])
  const [MyProfile, setMyProfile] = useState(false)
  const [User, setUser] = useState({
    id:"",
    first_name: "",
    last_name: "",
    profile_picture_url: "https://firebasestorage.googleapis.com/v0/b/linkhedin-vt.appspot.com/o/profilePictures%2Fdefault.jpg?alt=media&token=140c66e3-a51d-47ae-aaef-00ad043d2bd0",
    connect_request:[''],
    connected_user:['']
  })

  const education = useQuery(getUserEducation,{variables:{UserID:User.id}})
  const user = useQuery(getUserByID,{variables:{UserID: userID}})
  const experience = useQuery(getUserExperience,{variables:{UserID:User.id}})
  const refetchContext = RefetchContext();

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

  useEffect(() => {
    if(!experience.loading && !experience.error){
      setUserExperiences(experience.data.userExperience)
    }
  }, [experience.loading,experience.data])

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

  const toggleCreateExperience = () =>{
    setExperienceModal(!ExperienceModal)
  }

  useEffect(() => {
    if(EducationModal === true||ExperienceModal===true){
        document.body.style.overflow="hidden";
    }else{
        document.body.style.overflow = "visible"
    }
}, [EducationModal,ExperienceModal])
  
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
          refetchContext.refetchUser();
        })
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
        {ExperienceModal === true && (
          <CreateExperienceModal refetch={experience.refetch} toggle={toggleCreateExperience}></CreateExperienceModal>
          )}
        <Navbar></Navbar>
        <div className='profile'>
            <label htmlFor="file">
              <img className='profile-picture' src={User.profile_picture_url} alt="" />
            </label>
            <p className='text-black mv-20 text-xl'>{User.first_name}  {User.last_name}</p>
            {UserExperiences.map((experience:any)=>{
              if(experience.Active){
                return(
                  <p key={experience.ID} className='text-black mb-20 text-m'>{experience.Description} at {experience.CompanyName}</p>
                  )
                }
              })}
            <input disabled={!MyProfile} type="file" name='file' id='file' className='invisible' onChange={(e)=>{handleFileChange(e)}}/>
            {(MyProfile!=true && !User.connect_request.includes(userContext.user.id)&&!User.connected_user.includes(userContext.user.id)) && (
              <div>
                <button onClick={()=>{requestConnection({variables:{id:userContext.user.id, recepient:User.id}}).then(()=>{user.refetch()})}} className='blue-button-smaller text-white'>Request Connection</button>
              </div>
            )}
            {(MyProfile!=true && User.connect_request.includes(userContext.user.id)) && (
              <div>
                <button className='grey-button-smaller text-white'>Requested</button>
              </div>
            )}
            {(MyProfile!=true && User.connected_user.includes(userContext.user.id)) && (
              <div>
                <button className='white-button-smaller text-white'>Connected</button>
              </div>
            )}
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
          {UserEducations.length===0 && (
            <p className='text-black text-s w-full'>Empty</p>
          )}
          {UserEducations.map((edu:any)=>{
            return(
              <Education key={edu.ID} myprofile={MyProfile} education={edu} refetch={education.refetch}></Education>
            )
          })}
        </div>
        <div className='profile'>
          <div className='flex-row w-full space-between'>
            <p className='text-black text-l bold mb-20'>Experiences</p>
            {MyProfile === true && (
            <button className='add-button' onClick={toggleCreateExperience}>
              <AiOutlinePlus className='plus-logo'></AiOutlinePlus>
            </button>
            )}
          </div>
          {UserExperiences.length===0 && (
            <p className='text-black text-s w-full'>Empty</p>
          )}
          {UserExperiences.map((exp:any)=>{
            return(
              <Experience key={exp.ID} refetch={experience.refetch} myprofile={MyProfile} experience={exp}></Experience>
            )
          })}
        </div>
    </div>
  )
}
