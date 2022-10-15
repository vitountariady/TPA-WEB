import { useLazyQuery } from '@apollo/client'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React ,{useState, useEffect} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../contexts/authContext'
import { db } from '../../firebase.config'
import { getUserByID, SearchUsers } from '../../queries/queries'
import Navbar from '../Components/Navbar'

export default function MessagePage() {
    const chatRoomID = useParams().roomid
    console.log(chatRoomID)
    const navigate = useNavigate();
    const userContext= UserAuth();
    const [Users, setUsers] = useState([])
    const [Target, setTarget]:any = useState({})
    const [ChatRoom, setChatRoom]:any = useState({})
    const [search] = useLazyQuery(SearchUsers)
    const [getUser] = useLazyQuery(getUserByID)

    const createRoom = (target:string) =>{
        const q = query(collection(db,"ChatRoom"),where('users', 'array-contains', userContext.user.id))
        let udahAda= false
        let id = ''
        getDocs(q).then((documents)=>{
            documents.docs.forEach((document)=>{
                if(document.data().users.includes(target)){
                    udahAda = true
                    id = document.id
                }
            })
            if(!udahAda){
                addDoc(collection(db, "ChatRoom"),{
                    users: [userContext.user.id, target]
                }).then((e)=>{
                    id = e.id
                })
            }
            navigate('/message/'+id)
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
                    // console.log(e.data.getUser)
                    setTarget(e.data.getUser)
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
            <div className='h-450 w-80 mv-20 border-sering-pake white-bg start-row'>
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
                            if(!userContext.user.connected_user.includes(user.id)){
                                return
                            }
                            return(
                                <div key={user.id} onClick={()=>{createRoom(user.id)}} className='white-bg w-80 ph-20 border-sering-pake mv-10 flex-row space-around'>
                                    <div className='flex-row'>
                                    <img className='homepage-picture-smaller p-10' src={user.profile_picture_url} alt=""/>
                                    <p className='text-black bold text-s text-center'>{user.first_name +" "+user.last_name}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                {chatRoomID !== undefined && (
                    <div className='w-80 h-full flex-col' style={{borderLeft: "1px black solid"}}>
                        <div onClick={()=>{navigate(`/profile/${Target.id}`)}} className='w-full h-15 flex-row' style={{borderBottom: "1.5px black solid"}}>
                            <img className='homepage-picture p-10' src={Target.profile_picture_url} alt=""/>
                            <p className='text-black bold text-m text-center'>{Target.first_name +" "+Target.last_name}</p>
                        </div>
                        
                        <div>

                        </div>

                        
                    </div>
                )}
            </div>
        </div>
    )
}
