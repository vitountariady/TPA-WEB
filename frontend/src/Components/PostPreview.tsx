import { useLazyQuery, useQuery } from '@apollo/client'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { getPostByID, getUserByID } from '../../queries/queries'
import CommentContentTemplate from '../CommentContent'

export default function PostPreview(parameter:any) {
    const [User, setUser]:any = useState({});
    const post = useQuery(getPostByID,{variables:{id: parameter.id}})
    const [getUser] = useLazyQuery(getUserByID)
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!post.loading){
            if(post.data.GetPostByID.posterID !== undefined){
                getUser({variables:{UserID:post.data.GetPostByID.posterID}}).then((e)=>{
                    setUser(e.data.getUser)
                })
            }
        }
    }, [post.data])
    

    return (
        <div className='PostPreview'>
            {(post.loading) && (
                <p>Loading</p>
            )}
            {!post.loading && (
                <div className='w-full h-full'>
                    <div onClick={()=>{navigate('/profile/'+ User.id)}} className='h-10 flex-row ph-20 pv-10' style={{borderBottom:"1px black solid"}}>
                        <img src={User.profile_picture_url} className="preview-picture mh-10" />
                        <p className='text-black mh-10'>{User.first_name +' ' + User.last_name}</p>
                    </div>
                    {(post.data.GetPostByID.photoURL != ''|| post.data.GetPostByID.videoURL !='')&&(
                        <div className='w-full h-70'>
                            {post.data.GetPostByID.photoURL != '' &&(
                                <img src={post.data.GetPostByID.photoURL} style={{maxHeight:"100%"}} alt="" />
                            )}
                            {post.data.GetPostByID.videoURL !='' &&(
                                <video controls src={post.data.GetPostByID.videoURL} style={{maxHeight:"100%"}}></video>
                            )}
                        </div>
                    )}
                    <div className='h-10 w-full pv-10 flex-col' style={{borderTop:"1px black solid"}}>
                        <CommentContentTemplate font='m' texts={post.data.GetPostByID.text.split(' ')}></CommentContentTemplate>
                    </div>
                </div>
            )}
        </div>
    )
}
