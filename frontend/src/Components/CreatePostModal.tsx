import {MdDelete, MdDeleteOutline, MdInsertPhoto, MdVideoLibrary} from 'react-icons/Md'
import React, { useState } from 'react'
import { storage } from '../../firebase.config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { UserAuth } from '../../contexts/authContext'
import { useMutation, useQuery } from '@apollo/client'
import { createPost, getAllTags, getConnectedUser } from '../../queries/queries'
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'


export default function CreatePostModal(parameter:any){
    const [Photo, setPhoto] = useState('')
    const [Video, setVideo] = useState('')
    const [Error, setError] = useState('')
    const [Tulisan, setTulisan] = useState('')
    const userContext = UserAuth();
    const [create] = useMutation(createPost)
    const allTags = useQuery(getAllTags);
    const connecteduser = useQuery(getConnectedUser,{variables:{id: userContext.user.id}})

    const uploadPhoto = async (e:any) =>{
        const photoFile = e.target.files[0]
        const imageRef = ref(storage, 'postMedia/'+ photoFile.name)
        uploadBytes(imageRef, photoFile).then(()=>{
            getDownloadURL(imageRef).then((x)=>{
                setVideo('')
                setPhoto(x)
            })
        })
    }

    const uploadVideo = async (e:any) =>{
        const videoFile = e.target.files[0]
        const videoRef = ref(storage, 'postMedia/'+videoFile.name)
        uploadBytes(videoRef, videoFile).then(()=>{
            getDownloadURL(videoRef).then((x)=>{
                setPhoto('')
                setVideo(x)
            })
        })
    }

    const handleCreate = () =>{
        const text  = Tulisan
        if(text ===''){
            setError('Post description cannot be empty')
            return;
        }
        create({variables:{text: text, photoURL: Photo, videoURL:Video, posterID: userContext.user.id}}).then(()=>{
            setError('')
            parameter.refetch();
            parameter.toggle()
        })
    }

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

    return(
        <div className="modal center-all">
            <div className="small-form">
                <div className='w-full flex-row mb-20'>
                    <p className='text-black text-l bold mh-20'>Create a Post</p>
                </div>
                <div className='w-full center-col mb-20'>
                    {/* <textarea id='tulisan' style={{resize:"none",width:"340px", borderRadius:"5px", height:"100px",padding:"10px"}} placeholder="What do you want to talk about"></textarea> */}
                    <MentionsInput style={{resize:"none",width:"340px", borderRadius:"5px", height:"100px",padding:"10px"}} value={Tulisan} onChange={(e)=>{setTulisan(e.target.value);console.log(mentionsData)}} placeholder="What do you want to talk about" className="chat-input" id="comment">
                        <Mention trigger="@" data={mentionsData}/>
                        <Mention trigger="#" data={tagsArr}/>
                    </MentionsInput>
                </div>

                {(Photo!=='' || Video!=='') && (
                     <div className='w-full flex-row mb-20'>
                        <p className='text-black text-l bold mh-20'>Preview</p>
                    </div>
                )}

                {Photo!=='' && (
                    <img className='post-picture' src={Photo} alt="" />
                )}

                {Video!=='' && (
                    <video className='post-picture' controls src={Video}/>
                )}
                <div className='w-full flex-row mb-20'>
                    <label htmlFor="video">
                        <MdVideoLibrary className='icon mh-30'></MdVideoLibrary> 
                    </label>
                    <label htmlFor="photo">
                        <MdInsertPhoto className='icon'></MdInsertPhoto>
                    </label>
                    {(Photo!==''||Video!=='') && (
                        <label onClick={()=>{
                            setPhoto('');
                            setVideo('');
                        }} htmlFor="">
                            <MdDelete className='icon mh-30'></MdDelete>
                        </label>
                    )}
                    <input onChange={(e)=>{uploadVideo(e)}} style={{display:'none'}} type="file" name="video" id="video" />
                    <input onChange={(e)=>{uploadPhoto(e)}} style={{display:'none'}} type="file" name="photo" id="photo" />
                </div>


                <div className='w-full flex-row space-evenly mb-20'>
                    <button onClick={handleCreate} className='blue-button-smaller text-white'>Save</button>
                    <button onClick={parameter.toggle} className='red-button-smaller text-white'>Cancel</button>
                </div>

                {Error !='' && (
                    <p className='text-red text-m bold'>{Error}</p>
                )}  
            </div>
        </div>
    )
}