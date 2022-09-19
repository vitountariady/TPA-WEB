import { useMutation } from "@apollo/client";
import { UserAuth } from "../../contexts/authContext"
import { RefetchContext } from "../../contexts/refetcher";
import { UpdateName } from "../../queries/queries";

export default function UpdateNameModal (parameter:any){
    const user = UserAuth().user;
    const [update] = useMutation(UpdateName);
    const refetchContext = RefetchContext();

    const handleUpdate = () =>{
        const first_name = (document.getElementById("FirstName")as HTMLInputElement).value
        const last_name = (document.getElementById("LastName")as HTMLInputElement).value
        update({
            variables:{
                newLastName: last_name,
                newFirstName: first_name,
                id: user.id
            }
        }).then(()=>{
            refetchContext.refetchUser()
            parameter.refetch();
            parameter.toggle();
            }
        ).catch((err)=>{
            console.log(err)
        })
    }
    
    return(
        <div className="modal center-all">
            <div className="form">
                <div className='w-full flex-row mb-20'>
                    <p className='text-black text-l bold'>Update User</p>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>First Name</p>
                    <input id='FirstName' type="text" className='text-input white-bg' placeholder='First Name' defaultValue={user.first_name}/>
                </div>

                <div className='w-full flex-col'>
                    <p className='text-black text-s'>Last Name</p>
                    <input id='LastName' type="text" className='text-input white-bg' placeholder='Last Name' defaultValue={user.last_name}/>
                </div>
                <div className='w-full flex-row space-evenly'>
                    <button onClick={handleUpdate} className='blue-button-smaller text-white'>Save</button>
                    <button onClick={parameter.toggle} className='red-button-smaller text-white'>Cancel</button>
                </div>
            </div>
        </div>
    )
}