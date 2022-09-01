import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {AiFillEdit} from 'react-icons/ai'
import {BiTrash} from 'react-icons/bi'
import { deleteEducation } from '../../queries/queries'
import UpdateEducationModal from './UpdateEducationModal'
export default function Education(parameter:any) {
  const[del] = useMutation(deleteEducation)
  const [updateModal, setupdateModal] = useState(false)

  const deleteEdu = () =>{
    console.log(parameter.education.ID)
    del({variables:{id:parameter.education.ID}}).then(()=>{
      parameter.refetch()
    })
  }

  useEffect(() => {
    if(updateModal === true){
        document.body.style.overflow="hidden";
    }else{
        document.body.style.overflow = "visible"
    }
  }, [updateModal])

  const toggleUpdateModal= ()=>{
    setupdateModal(!updateModal)
  }

  return (
    <div className='EducationOrExperience'>
      {updateModal && (
        <UpdateEducationModal toggle={toggleUpdateModal} refetch = {parameter.refetch} education={parameter.education}></UpdateEducationModal>
      )}
      <div className='w-full flex-col'>
        <p className='text-black text-m'>{parameter.education.School}</p>
        <p className='text-black text-s'>{parameter.education.Degree}, {parameter.education.FieldOfStudy}</p>
        <p className='text-black text-s'>{parameter.education.StartDate} - {parameter.education.EndDate}</p>
      </div>
      {parameter.myprofile && (
        <div className='flex-col p-10'>
          <AiFillEdit onClick={toggleUpdateModal} className='icon mb-20'></AiFillEdit>
          <BiTrash onClick={deleteEdu} className='icon'></BiTrash>
        </div>
      )}
    </div>
  )
}
