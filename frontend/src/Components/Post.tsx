import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { AiFillLike } from "react-icons/ai"
import { BiCommentDetail, BiShare } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../../contexts/authContext"
import { addComment, getAllTags, getComments, getConnectedUser, getUserByID, likePost, makeHashtag, unlikePost } from "../../queries/queries"
import Comment from "./Comment"
import {Mention, MentionsInput, SuggestionDataItem} from "react-mentions"
import CommentContentTemplate from "../CommentContent"
import { mentionInputPostStyle, mentionStyle } from "../StyleSheet/mentionStyle"
import SharePostModal from "./SharePostModal"
import { IoIosSend } from "react-icons/io"
import { BsFillShareFill, BsShare } from "react-icons/bs"

export default function Post (parameter:any){
    const navigate = useNavigate();
    const [openComments, setopenComments] = useState(false);
    const [Share, setShare] = useState(false)
    const [ThereAreMore, setThereAreMore] = useState(true);
    const [CommentContent, setCommentContent] = useState("");
    const [Comments, setComments] = useState([]);
    const [like] = useMutation(likePost)
    const [unlike] = useMutation(unlikePost)
    const [comment] = useMutation(addComment)
    const User = useQuery(getUserByID,{variables:{UserID: parameter.post.posterID}})
    const userContext = UserAuth();
    const allTags = useQuery(getAllTags);
    const connecteduser = useQuery(getConnectedUser,{variables:{id: userContext.user.id}});
    const [addTag] = useMutation(makeHashtag);

    var mentionsData: SuggestionDataItem[] = []
    if(!connecteduser.loading && !connecteduser.error){
        // console.log(connecteduser.data.getConnectedUsers);
        connecteduser.data.getConnectedUsers.map((e:any)=>{
            let x : SuggestionDataItem = {id:e.id, display:`@${e.first_name}${e.last_name}`}
            mentionsData.push(x)
        })
    }
    
    var tagsArr:SuggestionDataItem[] = [];
    if(!allTags.loading && !allTags.error && allTags.data!==undefined){
        // console.log(allTags.data.getAllTags)
        allTags.data.getAllTags.map((e:any)=>{
            // console.log(e);
            let x : SuggestionDataItem={id:e.id, display: e.text}
            tagsArr.push(x)
        })
    }
    
    
    const comments = useQuery(getComments,{
        variables:{
            postID:parameter.post.id,
            limit:5,
            offset:0
        }
    })

    const createHashtag = (x: String) =>{
        var y = x.split(' ');
        var regex = /#[a-z0-9A-Z]+/g
        var regex2 =/@\[#[a-z0-9A-Z]+/g
        y.map((e)=>{
            if(e.match(regex) && !e.match(regex2)){
                addTag({variables: {text:e}})
            }
        })
    }

    const AddComment = () =>{
        const text  = CommentContent;
        createHashtag(CommentContent);
        comment({variables:{
            text: text,
            replyTo: '',
            userID: userContext.user.id,
            postID: parameter.post.id
        }}).then(()=>{
            comments.refetch({limit:Comments.length+1})
            setCommentContent("")
            allTags.refetch();
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        if(Share === true){
            document.body.style.overflow="hidden";
        }else{
            document.body.style.overflow = "visible"
        }
    }, [Share])

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

    const toggleComment = () =>{
        setopenComments(!openComments)
    }
    const toggleShare = () =>{
        setShare(!Share)
    }

    return(
        <div className="post white-bg center-col mv-10">
             {(!User.loading && !User.error) && (
                <>
                    <div className="w-full flex-row">
                        <img onClick={()=>{navigate(`/profile/${User.data.getUser.id}`)}} src={User.data.getUser.profile_picture_url} className="homepage-picture mh-10" alt="" />
                        <p className="text-black text-m bold mh-10">{User.data.getUser.first_name} {User.data.getUser.last_name}</p>
                    </div>
                    <div className="commentContainer">
                        {/* <p className="text-black mv-20 mh-15 text-m">{parameter.post.text}</p> */}
                        <CommentContentTemplate font="m" texts={parameter.post.text.split(' ')}></CommentContentTemplate>
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
                            <div className="mh-10"></div>
                        </div>
                        <div className="mh-20 center-row mh-20">
                            <BsShare onClick={toggleShare} className="icon"/>
                        </div>
                    </div>
                    {openComments && (
                        <>
                            <div className="flex-row mv-30 w-80">
                                <img onClick={()=>{navigate(`/profile/${userContext.user.id}`)}} src={userContext.user.profile_picture_url} className="homepage-picture mh-10" alt="" />
                                <MentionsInput style={{color: "#000000" , ...mentionInputPostStyle}} value={CommentContent} onChange={(e)=>{setCommentContent(e.target.value);console.log(mentionsData)}} placeholder="Comment" className="chat-input" id="comment">
                                    <Mention trigger="@" data={mentionsData} style={mentionStyle}/>
                                    <Mention trigger="#" data={tagsArr} style={mentionStyle}/>
                                </MentionsInput>
                                {/* <input id="comment" type="text" className="chat-input" placeholder="Comment"/> */}
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
                                            <Comment refetch = {comments.refetch} key={comment.id} comment ={comment} post={parameter.post} length={Comments.length}></Comment>
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
             {Share && (
                <SharePostModal post= {parameter.post} toggle={toggleShare}></SharePostModal>
             )}
             {User.loading && (
                <>
                    <p className="text-l text-black">Loading...</p>
                </>
             )}
        </div>
    )
}