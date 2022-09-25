export default function Job(parameter: any){
    return(
        <div className="w-full border-sering-pake mv-20 flex-col p-5">
            <p className="text-blue text-m bold mb-5">{parameter.job.position}</p>
            <p className="text-black text-s">{parameter.job.company}</p>
            <p className="text-black text-s">{parameter.job.location}</p>
        </div>
    )
}