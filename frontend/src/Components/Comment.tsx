import { useMutation, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../../contexts/authContext";
import { addComment, getUserByID, loadReplies } from "../../queries/queries"

export default function Comment (parameter:any) {
    const [Replies, setReplies] = useState([])
    const [ShowReplies, setShowReplies] = useState(false)
    const [AddReplies, setAddReplies] = useState(false)
    const [ThereAreMore, setThereAreMore] = useState(true)
    const [comment] = useMutation(addComment)
    const userContext = UserAuth();
    const User = useQuery(getUserByID,{variables:{UserID: parameter.comment.userID}})
    const navigate = useNavigate();

    const replies = useQuery(loadReplies,{
        variables:{
            commentID: parameter.comment.id,
            limit: 2,
            offset: 0,
        }
    })

    const AddComment = () =>{
        const text  = (document.getElementById("reply") as HTMLInputElement).value
        comment({variables:{
            text: text,
            replyTo: parameter.comment.id,
            userID: userContext.user.id,
            postID: parameter.post.id
        }}).then(()=>{
            replies.refetch({limit:Replies.length+1})
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        if(!replies.loading && !replies.error){
            if(replies.data.loadReplies.length < 2){
                setThereAreMore(false)
            }
            setReplies(replies.data.loadReplies)
        }
    }, [replies.loading, replies.data, replies.error])
    

    const loadMore = () =>{
        replies.fetchMore({
            variables:{offset: Replies.length}
        }).then((x)=>{
            if(x.data.loadReplies.length<2){
                setThereAreMore(false)
            }
            setReplies(Replies.concat(x.data.loadReplies))
        })
    }


    return(
        <div className="w-80 border-sering-pake flex-col p-20 mb-10">
            <div className="w-full flex-row mb-20">
                <img onClick={()=>{navigate(`/profile/${User.data.getUser.id}`)}} src={User.data.getUser.profile_picture_url} className="homepage-picture" alt="" />
                <div className="flex-col mh-30">
                    <p className="text-black text-s bold">{User.data.getUser.first_name} {User.data.getUser.last_name}</p>
                    <p className="text-black text-s">{parameter.comment.text}</p>
                    {(Replies.length>0 && ShowReplies==false) && (
                        <p onClick={()=>{setShowReplies(true)}} className="text-black text-s bold">Show Replies</p>
                    )}
                </div> 
            </div>
            {ShowReplies ===true && (
                <div className="flex-col mv-20 mh-40 w-full">
                    <p className="text-black text-m bold mv-10">Replies</p>
                    {Replies.map((reply:any)=>{
                        return(
                            <Comment key={reply.id} comment={reply} post={parameter.post}></Comment>
                        )
                    })}
                    {ThereAreMore && (
                        <p onClick={loadMore} className="text-black text-s bold">Load More</p>
                    )}
                </div>
            )}
            <div className="w-full flex-row">
                <div className="mh-10 center-row">
                    <AiFillLike className="icon-liked"/>
                    <p className="text-black text-s mh-10">{parameter.comment.likes.length}</p>
                </div>
                <div className="center-row mh-20">
                    <BiCommentDetail onClick={()=>{setAddReplies(!AddReplies)}} className="icon"/>
                </div>
            </div>
            {AddReplies && (
                <div className="w-full flex-row mv-30 mh-10">
                    <img onClick={()=>{navigate(`/profile/${User.data.getUser.id}`)}} src={User.data.getUser.profile_picture_url} className="homepage-picture mh-10" alt="" />
                    <input id="reply" type="text" className="chat-input" placeholder="Reply"/>
                    <button onClick={AddComment} className="send-button">Send</button>
                </div>
            )}
        </div>
    )
}