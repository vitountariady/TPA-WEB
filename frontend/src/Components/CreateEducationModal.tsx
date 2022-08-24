import { useMutation } from '@apollo/client'
import React from 'react'
import { UserAuth } from '../../contexts/authContext';
import { createEducation } from '../../queries/userQueries';

export default function CreateEducationModal(parameter:any) {

const [create] = useMutation(createEducation);

const userContext = UserAuth();

const handleCreate = () =>{
    const school = (document.getElementById("School") as HTMLInputElement).value
    const degree = (document.getElementById("Degree") as HTMLInputElement).value
    const studyField = (document.getElementById("StudyField") as HTMLInputElement).value
    const startDate = (document.getElementById("StartDate") as HTMLInputElement).value
    const endDate = (document.getElementById("EndDate") as HTMLInputElement).value
    const grade = parseFloat((document.getElementById("Grade") as HTMLInputElement).value)
    const activities = (document.getElementById("Activities") as HTMLInputElement).value
    const description = (document.getElementById("Description") as HTMLInputElement).value

    console.log(userContext.user.id);

    create({variables:{
        UserID: userContext.user.id,
        School: school,
        Degree: degree,
        FieldOfStudy: studyField,
        StartDate: startDate,
        EndDate: endDate,
        Grade: grade,
        Activities: activities,
        Description: description

    }}).catch((err)=>{
        console.log(err)
    })
}

  return (
    <div className='modal center-all'>
       <div className='form'>
            <div className='w-full flex-row mb-20'>
                <p className='text-black text-l bold'>Add education</p>
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>School</p>
                <input id='School' type="text" className='text-input white-bg' placeholder='Ex: Binus University'/>
            </div>
            
            <div className='w-full flex-col'>
                <p className='text-black text-s'>Degree</p>
                <input id='Degree' type="text" className='text-input white-bg' placeholder="Ex: Bachelor's"/>
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Field of Study</p>
                <input id='StudyField' type="text" className='text-input white-bg' placeholder="Ex: Computer Science"/>
            </div>

            <div className='w-full flex-row space-between mb-20'>
                <p className='text-black text-s'>Start Date</p>
                <input type="date" id='StartDate' className='white-bg text-black text-s border-sering-pake'/>
            </div>

            <div className='w-full flex-row space-between mb-20'>
                <p className='text-black text-s'>End Date</p>
                <input type="date" id='EndDate' className='white-bg text-black text-s border-sering-pake'/>
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Grade</p>
                <input id='Grade' type="text" className='text-input white-bg' placeholder=""/>
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Activities</p>
                <input id='Activities' type="text" className='text-input white-bg' placeholder="Ex: Voleyball, Basketball"/>
            </div>

            <div className='w-full flex-col'>
                <p className='text-black text-s'>Activities</p>
                <input id='Description' type="text" className='text-input white-bg' placeholder=""/>
            </div>

            <div className='w-full flex-row space-evenly'>
                <button onClick={handleCreate} className='blue-button-smaller text-white'>Save</button>
                <button onClick={parameter.toggle} className='red-button-smaller text-white'>Cancel</button>
            </div>
            
       </div>
    </div>
  )
}
