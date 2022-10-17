import { useLazyQuery } from '@apollo/client'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import {useState, useEffect} from 'react'
import { AiOutlineSearch, AiOutlineSend } from 'react-icons/ai'
import { BsShare } from 'react-icons/bs'
import { UserAuth } from '../../contexts/authContext'
import { db } from '../../firebase.config'
import { SearchUsers } from '../../queries/queries'

export default function SharePostModal(parameter:any) {
    const [search] = useLazyQuery(SearchUsers)
    const [Users, setUsers] = useState([])
    const userContext = UserAuth()

    const searchUser = () =>{
        const text = (document.getElementById("search") as HTMLInputElement).value
        
        search({variables:{query: text}}).then((e)=>{
            setUsers(e.data.searchUsers)
        })
    }

    useEffect(() => {
        search({variables:{query: ''}}).then((e)=>{
            setUsers(e.data.searchUsers)
        })
    }, [])
    

    const sendMessage = (id: string) =>{
        addDoc(collection(db,"ChatRoom", id, "Chats"),{
            Message: '',
            Sender: userContext.user.id,
            Post: parameter.post.id,
            User:'',
            Image:'',
            Timestamp: serverTimestamp()
        }).then(()=>{
            parameter.toggle()
        })
    }

    const createRoom = (target:string) =>{
        const q = query(collection(db,"ChatRoom"),where('users', 'array-contains', userContext.user.id))
        let udahAda= false
        let id = ''
        getDocs(q).then((documents)=>{
            documents.docs.forEach((document)=>{
                if(document.data().users.includes(target)){
                    udahAda = true
                    id = document.id
                    console.log(id)
                    sendMessage(id)
                }
            })
            if(!udahAda){
                addDoc(collection(db, "ChatRoom"),{
                    users: [userContext.user.id, target]
                }).then((e)=>{
                    id = e.id
                    console.log(id)
                    sendMessage(id)
                })
            }
        })
    }

    return (
        <div className='modal center-all'>
            <div className='form'>
            <div className='flex-col w-80 pr-40 h-full max-h-full'>
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
                                <div key={user.id} className='white-bg w-80 ph-20 border-sering-pake mv-10 flex-row space-around'>
                                    <div className='flex-row space-around'>
                                        <img className='homepage-picture-smaller p-10' src={user.profile_picture_url} alt=""/>
                                        <p className='text-black bold text-s text-center mh-30'>{user.first_name +" "+user.last_name}</p>
                                        <AiOutlineSend className='icon' onClick={()=>{createRoom(user.id)}}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button className='red-button-smaller text-white' onClick={parameter.toggle}>Close</button>
            </div>
        </div>
    )
}
