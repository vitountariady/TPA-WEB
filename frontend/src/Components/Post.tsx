import { useMutation, useQuery } from "@apollo/client"
import { AiFillLike } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../../contexts/authContext"
import { getUserByID, likePost, unlikePost } from "../../queries/queries"

export default function Post (parameter:any){
    const navigate = useNavigate();
    const [like] = useMutation(likePost)
    const [unlike] = useMutation(unlikePost)
    const User = useQuery(getUserByID,{variables:{UserID: parameter.post.posterID}})
    const userContext = UserAuth();

    const LikePost = () =>{
        like({variables:{id:parameter.post.id, UserID:userContext.user.id}}).then(()=>{
            parameter.refetch({limit:parameter.length})
        }
        ).catch((err)=>{console.log(err)})
    }

    const UnlikePost = () =>{
        unlike({variables:{id:parameter.post.id, UserID:userContext.user.id}}).then(()=>{
            parameter.refetch({limit:parameter.length})
        }
        ).catch((err)=>{console.log(err)})
    }

    return(
        <div className="post border-sering-pake bg-white center-col">
             {(!User.loading && !User.error) && (
                <>
                    <div className="w-full flex-row">
                        <img onClick={()=>{navigate(`/profile/${User.data.getUser.id}`)}} src={User.data.getUser.profile_picture_url} className="homepage-picture mh-10" alt="" />
                        <p className="text-black text-m bold mh-10">{User.data.getUser.first_name} {User.data.getUser.last_name}</p>
                    </div>
                    <div className="w-full flex-col">
                        <p className="text-black mv-20 mh-15 text-s">{parameter.post.text}</p>
                    </div>
                    {parameter.post.photoURL !== '' &&(
                        <img className="post-picture" src={parameter.post.photoURL} alt="" />
                    )}
                    {parameter.post.videoURL !== '' &&(
                        <video className="post-picture" src={parameter.post.videoURL} controls/>
                    )}
                    <div className="w-full flex-row mv-10">
                        <div className="mh-20 center-row">
                            {!parameter.post.likes.includes(userContext.user.id)&&(
                                <AiFillLike onClick={LikePost} className="icon"/>
                            )}
                            {parameter.post.likes.includes(userContext.user.id)&&(
                                <AiFillLike onClick={UnlikePost} className="icon-liked"/>
                            )}
                            <p className="text-black text-s mh-10">{parameter.post.likes.length}</p>
                        </div>
                        <div className="mh-20 center-row mh-20">
                            <BiCommentDetail className="icon"/>
                        </div>
                    </div>
                </>
             )}
             {User.loading && (
                <>
                    <p className="text-l text-black">Loading...</p>
                </>
             )}
        </div>
    )
}