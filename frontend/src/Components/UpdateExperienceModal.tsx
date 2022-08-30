import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { UserAuth } from '../../contexts/authContext';
import { updateExperience } from '../../queries/queries'

export default function UpdateExperienceModal(parameter:any) {
    const [update] = useMutation(updateExperience);
    const [ActiveJob, setActiveJob] = useState(parameter.experience.Active);
    const userContext = UserAuth();

    console.log(parameter.experience.Active)

    const handleUpdate = () =>{
        const title = (document.getElementById("Title") as HTMLInputElement).value
        const employmentType = (document.getElementById("EmploymentType") as HTMLInputElement).value
        const companyName = (document.getElementById("CompanyName") as HTMLInputElement).value
        const location = (document.getElementById("Location") as HTMLInputElement).value
        const active = (document.getElementById("Active") as HTMLInputElement).checked
        const startYear = (document.getElementById("StartYear") as HTMLInputElement).value
        const endYear = (document.getElementById("EndYear") as HTMLInputElement).value
        const industry = (document.getElementById("Industry") as HTMLInputElement).value
        const description = (document.getElementById("Description") as HTMLInputElement).value

        update({variables:{
            id:parameter.experience.ID,
            UserID: userContext.user.id,
            Title:title,
            EmploymentType:employmentType,
            CompanyName:companyName,
            Location:location,
            Active:active,
            StartYear:startYear,
            EndYear:endYear,
            Industry:industry,
            Description:description
        }}).then(()=>{
            parameter.refetch()
            parameter.toggle()
        })
    }


    return (
        <div className='modal center-all'>
        <div className='form'>
                <div className='w-full flex-row mb-20'>
                    <p className='text-black text-l bold'>Add experience</p>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Title</p>
                    <input id='Title' type="text" className='text-input white-bg' placeholder='Ex: Software Engineer' defaultValue={parameter.experience.Title}/>
                </div>
                
                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Employment Type</p>
                    <select className='text-input white-bg' id="EmploymentType" defaultValue={parameter.experience.EmploymentType}>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Apprenticeship">Apprenticeship</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Company Name</p>
                    <input id='CompanyName' type="text" className='text-input white-bg' placeholder="Ex: SLC" defaultValue={parameter.experience.CompanyName}/>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Location</p>
                    <input id='Location' type="text" className='text-input white-bg' placeholder="Ex: Jakarta, Indonesia" defaultValue={parameter.experience.Location}/>
                </div>

                <div className='w-full flex-row'>
                    <p className='text-black text-s'>This is my current active job</p>
                    <input onClick={()=>{setActiveJob((document.getElementById("Active") as HTMLInputElement).checked)}} id='Active' type="checkbox" className='text-input white-bg' defaultChecked={parameter.experience.Active}/>
                </div>

                <div className='w-full flex-row space-between mb-20'>
                    <p className='text-black text-s'>Start Year</p>
                    <input type="number" id='StartYear'className='white-bg text-black text-s border-sering-pake' defaultValue={parameter.experience.StartYear}/>
                </div>
                {
                    ActiveJob===true && (
                        <div className='w-full flex-row space-between mb-20'>
                            <p className='text-black text-s'>End Year</p>
                            <input disabled={ActiveJob} type="text" id='EndYear'className='white-bg text-black text-s border-sering-pake'defaultValue="Present"/>
                        </div>
                    )
                }
                {
                    ActiveJob!==true && (
                        <div className='w-full flex-row space-between mb-20'>
                            <p className='text-black text-s'>End Year</p>
                            <input type="number" id='EndYear'className='white-bg text-black text-s border-sering-pake'defaultValue={parameter.experience.EndYear}/>
                        </div>
                    )
                }

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Industry</p>
                    <input id='Industry' type="text" className='text-input white-bg' placeholder="Ex: Retail" defaultValue={parameter.experience.Industry}/>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Profile Headline</p>
                    <input id='Description' type="text" className='text-input white-bg' placeholder="" defaultValue={parameter.experience.Description}/>
                </div>

                <div className='w-full flex-row space-evenly'>
                    <button onClick={handleUpdate} className='blue-button-smaller text-white'>Save</button>
                    <button onClick={parameter.toggle} className='red-button-smaller text-white'>Cancel</button>
                </div>
                
        </div>
        </div>
    )
}
