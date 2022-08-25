import React from 'react'
export default function Education(parameter:any) {
  return (
    <div className='w-full pv-5 mb-20 flex-col'>
        <p className='text-black text-m'>{parameter.education.School}</p>
        <p className='text-black text-s'>{parameter.education.Degree}, {parameter.education.FieldOfStudy}</p>
        <p className='text-black text-s'>{parameter.education.StartDate} - {parameter.education.EndDate}</p>
    </div>
  )
}
