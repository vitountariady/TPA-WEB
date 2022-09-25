import { useMutation, useQuery } from "@apollo/client"
import { addJob } from "../../queries/queries";

export default function CreateJobModal(parameter:any){
    const [create]=useMutation(addJob);
    const handleCreate=()=>{
        const position = (document.getElementById("Position") as HTMLInputElement).value
        const company = (document.getElementById("Company") as HTMLInputElement).value
        const location = (document.getElementById("Location") as HTMLInputElement).value
        create({variables:{
            position: position,
            company: company,
            location: location
        }}).then(()=>{
            parameter.refetch();
            parameter.toggle();
        })
    }

    return(
        <div className="modal center-all">
            <div className="form">
                <div className='w-full flex-row mb-20'>
                    <p className='text-black text-l bold'>Post a Job</p>
                </div>
                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Position</p>
                    <input id='Position' type="text" className='text-input white-bg' placeholder='Ex: Software Engineer'/>
                </div>
                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Company</p>
                    <input id='Company' type="text" className='text-input white-bg' placeholder='Ex: Tokopaedi'/>
                </div>
                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Location</p>
                    <input id='Location' type="text" className='text-input white-bg' placeholder='Ex: Jakarta'/>
                </div>
                <div className='w-full flex-row space-evenly'>
                    <button onClick={handleCreate} className='blue-button-smaller text-white'>Save</button>
                    <button onClick={parameter.toggle} className='red-button-smaller text-white'>Cancel</button>
                </div>
            </div>
        </div>
    )
}
