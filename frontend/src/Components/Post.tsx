import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { AiFillLike } from "react-icons/ai"
import { BiCommentDetail } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../../contexts/authContext"
import { addComment, getComments, getUserByID, likePost, unlikePost } from "../../queries/queries"
import Comment from "./Comment"

export default function Post (parameter:any){
    const navigate = useNavigate();
    const [openComments, setopenComments] = useState(false);
    const [ThereAreMore, setThereAreMore] = useState(true);
    const [Comments, setComments] = useState([]);
    const [like] = useMutation(likePost)
    const [unlike] = useMutation(unlikePost)
    const [comment] = useMutation(addComment)
    const User = useQuery(getUserByID,{variables:{UserID: parameter.post.posterID}})
    const userContext = UserAuth();

    const comments = useQuery(getComments,{
        variables:{
            postID:parameter.post.id,
            limit:5,
            offset:0
        }
    })

    const AddComment = () =>{
        const text  = (document.getElementById("comment") as HTMLInputElement).value
        comment({variables:{
            text: text,
            replyTo: '',
            userID: userContext.user.id,
            postID: parameter.post.id
        }}).then(()=>{
            comments.refetch({limit:Comments.length+1})
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        if(!comments.loading && !comments.error){
            if(comments.data.getComments.length<5){
                setThereAreMore(false)
            }
            setComments(comments.data.getComments);
        }
      }, [comments.loading, comments.error, comments.data])

    const loadMore = () =>[
        comments.fetchMore({
            variables:{offset:Comments.length}
        }).then((x)=>{
            console.log(x.data.getComments.length)
            if(x.data.getComments.length<5){
                setThereAreMore(false)
            }
            setComments(Comments.concat(x.data.getComments))
        })
    ]

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

    const toggleComment = () =>[
        setopenComments(!openComments)
    ]

    return(
        <div className="post white-bg center-col mv-10">
             {(!User.loading && !User.error) && (
                <>
                    <div className="w-full flex-row">
                        <img onClick={()=>{navigate(`/profile/${User.data.getUser.id}`)}} src={User.data.getUser.profile_picture_url} className="homepage-picture mh-10" alt="" />
                        <p className="text-black text-m bold mh-10">{User.data.getUser.first_name} {User.data.getUser.last_name}</p>
                    </div>
                    <div className="w-full flex-col">
                        <p className="text-black mv-20 mh-15 text-m">{parameter.post.text}</p>
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
                            <BiCommentDetail onClick={toggleComment} className="icon"/>
                        </div>
                    </div>
                    {openComments && (
                        <>
                            <div className="flex-row mv-30 w-80">
                                <img onClick={()=>{navigate(`/profile/${User.data.getUser.id}`)}} src={User.data.getUser.profile_picture_url} className="homepage-picture mh-10" alt="" />
                                <input id="comment" type="text" className="chat-input" placeholder="Comment"/>
                                <button onClick={AddComment} className="send-button">Send</button>
                            </div>
                            {Comments.length>0 && (
                                <div className="w-full flex-row">
                                    <p className="text-black text-l mh-40 mv-20"> Comments</p>
                                </div>
                            )}
                            {(!comments.loading && !comments.error) && (
                                <>
                                    {Comments.map((comment:any)=>{
                                        return(
                                            <Comment key={comment.id} comment ={comment} post={parameter.post}></Comment>
                                        )
                                    })}
                                    {ThereAreMore && (
                                        <button onClick={loadMore} className="white-button-smaller">Load More</button>
                                    )}
                                </>
                            )}
                        </>
                    )}
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