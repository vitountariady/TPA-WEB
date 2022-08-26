import { useMutation } from '@apollo/client'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { deleteExperience } from '../../queries/queries'

export default function Experience(parameter:any) {
const[del] = useMutation(deleteExperience)

  const deleteExp = () =>{
    del({variables:{id:parameter.experience.ID}}).then(()=>{
        parameter.refetch()
    })
  } 

  return (
    <div className='EducationOrExperience'>
        <div className='w-full flex-col'>
            <p className='text-black text-m'>{parameter.experience.Title}</p>
            <p className='text-black text-s'>{parameter.experience.CompanyName} [{parameter.experience.EmploymentType}]</p>
            <p className='text-black text-s'>{parameter.experience.StartYear} - {parameter.experience.EndYear}</p>
            <p className='text-black text-s'>{parameter.experience.Location}</p>
        </div>
        {parameter.myprofile && (
            <div className='flex-col p-10'>
                <AiFillEdit className='icon mb-20'></AiFillEdit>
                <BiTrash onClick={deleteExp} className='icon'></BiTrash>
            </div>
        )}
    </div>
  )
}
