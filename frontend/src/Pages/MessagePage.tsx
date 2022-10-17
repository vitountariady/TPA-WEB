import { useLazyQuery } from '@apollo/client'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import React ,{useState, useEffect} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../contexts/authContext'
import { db } from '../../firebase.config'
import { getPostByID, getUserByID, SearchUsers } from '../../queries/queries'
import Navbar from '../Components/Navbar'
import PostPreview from '../Components/PostPreview'
import ProfilePreview from '../Components/ProfilePreview'

export default function MessagePage() {
    const chatRoomID:any  = useParams().roomid
    const navigate = useNavigate();
    const userContext= UserAuth();
    const [Users, setUsers] = useState([])
    const [Target, setTarget]:any = useState(undefined)
    const [Chats, setChats]:any = useState([])
    const [search] = useLazyQuery(SearchUsers)
    const [getUser] = useLazyQuery(getUserByID)
    const [getPost] = useLazyQuery(getPostByID)

    const createRoom = (target:string) =>{
        const q = query(collection(db,"ChatRoom"),where('users', 'array-contains', userContext.user.id))
        let udahAda= false
        let id = ''
        getDocs(q).then((documents)=>{
            documents.docs.forEach((document)=>{
                if(document.data().users.includes(target)){
                    udahAda = true
                    id = document.id
                    navigate('/message/'+id)
                }
            })
            if(!udahAda){
                addDoc(collection(db, "ChatRoom"),{
                    users: [userContext.user.id, target]
                }).then((e)=>{
                    id = e.id
                    navigate('/message/'+id)
                })
            }
        })
    }

    const sendMessage = () =>{
        const text = (document.getElementById("chatInput") as HTMLInputElement).value
        if (text ===''){
            return
        }
        let x:any = document.getElementById("chatInput")
        x.value =''
        addDoc(collection(db,"ChatRoom", chatRoomID, "Chats"),{
            Message: text,
            Sender: userContext.user.id,
            Post: '',
            User:'',
            Image:'',
            Timestamp: serverTimestamp()
        })
    }

    useEffect(()=>{
        var target:any
        if(chatRoomID !== undefined){
            getDoc(doc(db, "ChatRoom", chatRoomID)).then((e:any)=>{
                e.data().users.forEach((user:any)=>{
                    if(user!= userContext.user.id){
                        target = user
                    }
                })
                getUser({variables: {UserID: target}}).then((e)=>{
                    setTarget(e.data.getUser)
                })
                const q = query(collection(db,"ChatRoom", chatRoomID,"Chats"), orderBy("Timestamp", "asc"))
                onSnapshot(q, (x)=>{
                    console.log(x.docs)
                    setChats(x.docs)
                })
            })
        }
    }, [chatRoomID])

    useEffect(() => {
        search({variables:{query: ''}}).then((e)=>{
            setUsers(e.data.searchUsers)
        })
    }, [])
    

    const searchUser = () =>{
        const text = (document.getElementById("search") as HTMLInputElement).value
        search({variables:{query: text}}).then((e)=>{
            setUsers(e.data.searchUsers)
        })
    }

    return (
        <div className='page beige-bg center-col fullscreen'>
            <Navbar></Navbar>
            <div className='h-500 w-80 mv-20 white-bg start-row' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px", borderRadius:"5px"}}>
                <div className='flex-col w-30 pr-40 h-full max-h-full'>
                    <div className='h-10 w-full p-20 center-col'>
                        <div className='flex-row w-full'>
                            <input id='search' type="text" className='searchbar white-bg' placeholder='Search Connected User' />
                            <button onClick={searchUser} className='send-button'>
                                <AiOutlineSearch className='icon-white'></AiOutlineSearch>
                            </button>
                        </div>
                    </div>
                    <div className='w-full h-90 p-20 overflow-y'>
                        <p className='text-black bold text-m w-full mb-20'>Connected Users</p>
                        {Users.map((user:any)=>{
                            if(!userContext.user.connected_user.includes(user.id) || userContext.user.blocked_user.includes(user.id)){
                                return
                            }
                            return(
                                <div key={user.id} onClick={()=>{createRoom(user.id)}} style={{cursor:"pointer"}} className='white-bg w-80 ph-20 border-sering-pake mv-10 flex-row space-around'>
                                    <div className='flex-row'>
                                    <img className='homepage-picture-smaller p-10' src={user.profile_picture_url} alt=""/>
                                    <p className='text-black bold text-s text-center'>{user.first_name +" "+user.last_name}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                {(chatRoomID !== undefined && Target!==undefined) && (
                    <div className='w-80 h-full flex-col' style={{border: "0.5px black solid", borderRadius:"5px"}}>
                        <div onClick={()=>{navigate(`/profile/${Target.id}`)}} className='w-full h-15 flex-row' style={{borderBottom: "1px black solid"}}>
                            <img className='homepage-picture p-10' src={Target.profile_picture_url} alt=""/>
                            <p className='text-black bold text-m text-center'>{Target.first_name +" "+Target.last_name}</p>
                        </div>
                        
                        <div className='w-full h-77'>
                            <div className='w-full center-col overflow-y h-full'>
                                {Chats.map((chat:any)=>{
                                    let data = chat.data()
                                    if(data.Message !==''){
                                        if(data.Sender == Target.id){
                                            return(
                                                <div className='message2'>
                                                    <div className='messagebubble2'>
                                                        <p>{data.Message}</p>
                                                    </div>
                                                </div>
                                            )
                                        }else if(data.Sender == userContext.user.id){
                                            return(
                                                <div className='message1'>
                                                    <div className='messagebubble1'>
                                                        <p>{data.Message}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }

                                    if(data.Post!==''){
                                        if(data.Sender == Target.id){
                                            return(
                                                <div className='message2'>
                                                    <PostPreview id={data.Post}></PostPreview>
                                                </div>
                                            )
                                        }else if(data.Sender == userContext.user.id){
                                            return(
                                                <div className='message1'>
                                                    <PostPreview id={data.Post}></PostPreview>
                                                </div>
                                            )
                                        }
                                    }

                                    if(data.User!==''){
                                        if(data.Sender == Target.id){
                                            return(
                                                <div className='message2'>
                                                    <ProfilePreview id={data.User}></ProfilePreview>
                                                </div>
                                            )
                                        }else if(data.Sender == userContext.user.id){
                                            return(
                                                <div className='message1'>
                                                    <ProfilePreview id={data.User}></ProfilePreview>
                                                </div>
                                            )
                                        }
                                    }
                                })}
                            </div>
                        </div>
                        <div className='w-full flex-row h-fit'>
                            <input type="text" className='chat-input' style={{borderTopLeftRadius: "0"}} placeholder='Enter a message' id='chatInput'/>
                            <button onClick={sendMessage} style={{borderTopRightRadius: "0"}} className='send-button'>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
