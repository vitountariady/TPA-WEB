import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { getJobs } from "../../queries/queries";
import CreateJobModal from "../Components/CreateJobModal";
import Job from "../Components/Job";
import Navbar from "../Components/Navbar";

export default function JobsPage(){
    const Jobs = useQuery(getJobs)
    const [JobList, setJobList] = useState([])
    const [OpenModal, setOpenModal] = useState(false)

    const toggleModal = () =>{
        setOpenModal(!OpenModal)
    }

    useEffect(() => {
        console.log("Masuk")
        if(!Jobs.loading && !Jobs.error){
            setJobList(Jobs.data.getAllJobs)
            console.log(Jobs.data.getAllJobs)
        }
    }, [Jobs])

    useEffect(() => {
        if( OpenModal === true){
            document.body.style.overflow="hidden";
        }else{
            document.body.style.overflow = "visible"
        }
    }, [OpenModal])
    

    return(
        <div className="beige-bg fullscreen center-col page">
            {OpenModal && (
                <CreateJobModal toggle={toggleModal} refetch={Jobs.refetch}></CreateJobModal>
            )}
            <Navbar></Navbar>
            <div className="main-container white-bg flex-col">
                <div className="w-full flex-row space-between">
                   <p className="text-black text-l bold">Jobs</p>
                   <button onClick={toggleModal} className="add-button">
                        <AiOutlinePlus className='plus-logo'></AiOutlinePlus>
                   </button>
                </div>
                {Jobs.loading && (
                    <p className="text-black text-s w-full mv-20">Loading...</p>
                )}
                {(!Jobs.loading && JobList.length === 0 ) && (
                    <p className="text-black text-s w-full mv-20">Empty</p>
                )}
                {JobList.map((job:any)=>{
                    console.log(job.id)
                    return(
                        <Job key={job.id} job= {job}></Job>
                    )
                })}
            </div>
        </div>
    )
}