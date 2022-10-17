import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../../contexts/authContext";
import { addComment, getAllTags, getConnectedUser, getUserByID, likeComment, loadReplies, unlikeComment } from "../../queries/queries"
import CommentContentTemplate from "../CommentContent";
import { mentionStyle } from "../StyleSheet/mentionStyle";

export default function Comment (parameter:any) {
    const [Replies, setReplies] = useState([])
    const [ShowReplies, setShowReplies] = useState(false)
    const [AddReplies, setAddReplies] = useState(false)
    const [ThereAreMore, setThereAreMore] = useState(true)
    const [CommentContent, setCommentContent] = useState("");
    const [like] = useMutation(likeComment);
    const [unlike] = useMutation(unlikeComment);
    const [comment] = useMutation(addComment)
    const userContext = UserAuth();
    const allTags = useQuery(getAllTags);
    const connecteduser = useQuery(getConnectedUser,{variables:{id: userContext.user.id}});
    const User = useQuery(getUserByID,{variables:{UserID: parameter.comment.userID}})
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     userContext.user.connected_user.map((connection:any) => {
    //         connecteduser({variables:{UserID: connection}}).then((e)=>{
    //             let userData = e.data.getUser
    //             let mentionData : SuggestionDataItem ={id: userData.id , display: "@"+userData.first_name + userData.last_name}
    //             setmentionsData(mentionsData.concat(mentionData))
    //         })
    //     });
    // }, [userContext.user])

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

    const LikeComment = () =>{
        like({variables:{
            commentID: parameter.comment.id,
            userID: userContext.user.id
        }}).then(()=>{
            parameter.refetch({limit: parameter.length})
        })
    }

    const UnlikeComment = () =>{
        unlike({variables:{
            commentID: parameter.comment.id,
            userID: userContext.user.id
        }}).then(()=>{
            parameter.refetch({limit: parameter.length})
        })
    }

    const replies = useQuery(loadReplies,{
        variables:{
            commentID: parameter.comment.id,
            limit: 2,
            offset: 0,
        }
    })

    const AddComment = () =>{
        const text = CommentContent
        comment({variables:{
            text: text,
            replyTo: parameter.comment.id,
            userID: userContext.user.id,
            postID: parameter.post.id
        }}).then(()=>{
            replies.refetch({limit:Replies.length+1})
            setCommentContent("")
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
                    <p className="text-black text-s bold mh-15">{User.data.getUser.first_name} {User.data.getUser.last_name}</p>
                    {/* <div className="commentContainer"> */}
                        <CommentContentTemplate font="s" texts={parameter.comment.text.split(' ')}></CommentContentTemplate>
                    {/* </div> */}
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
                            <Comment refetch={replies.refetch} length= {Replies.length} key={reply.id} comment={reply} post={parameter.post}></Comment>
                        )
                    })}
                    {ThereAreMore && (
                        <p onClick={loadMore} className="text-black text-s bold">Load More</p>
                    )}
                </div>
            )}
            <div className="w-full flex-row">
                <div className="mh-10 center-row">
                    {!parameter.comment.likes.includes(userContext.user.id)&&(
                        <AiFillLike onClick={LikeComment} className="icon"/>
                    )}
                    {parameter.comment.likes.includes(userContext.user.id)&&(
                        <AiFillLike onClick={UnlikeComment} className="icon-liked"/>
                    )}
                    <p className="text-black text-s mh-10">{parameter.comment.likes.length}</p>
                </div>
                <div className="center-row mh-20">
                    <BiCommentDetail onClick={()=>{setAddReplies(!AddReplies)}} className="icon"/>
                </div>
            </div>
            {AddReplies && (
                <div className="w-full flex-row mv-30 mh-10">
                    <img onClick={()=>{navigate(`/profile/${User.data.getUser.id}`)}} src={User.data.getUser.profile_picture_url} className="homepage-picture mh-10" alt="" />
                    {/* <input id="reply" type="text" className="chat-input" placeholder="Reply"/> */}
                    <MentionsInput value={CommentContent} onChange={(e)=>{setCommentContent(e.target.value); console.log(mentionsData)}} placeholder="Comment" className="chat-input" id="comment">
                        <Mention trigger="@" data={mentionsData} style={mentionStyle}/>
                        <Mention trigger="#" data={tagsArr} style={mentionStyle}/>
                    </MentionsInput>
                    <button onClick={AddComment} className="send-button">Send</button>
                </div>
            )}
        </div>
    )
}