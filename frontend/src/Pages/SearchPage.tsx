import { useMutation, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserAuth } from '../../contexts/authContext'
import { requestConnect, SearchPosts, SearchUsers } from '../../queries/queries'
import Navbar from '../Components/Navbar'
import Post from '../Components/Post'

export default function SearchPage() {
  const userContext = UserAuth();
  const [Filter, setFilter] = useState('all')
  const [Posts, setPosts] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [HasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [requestConnection] = useMutation(requestConnect)
  
  var searchQuery = useParams().query
  if(searchQuery === undefined){
    searchQuery = ''
  }
  
  const posts = useQuery(SearchPosts,{variables:{query:searchQuery, limit:3, offset:0}});
  const users = useQuery(SearchUsers, {variables:{query: searchQuery}});

  useEffect(()=>{
    if(!posts.loading && !posts.error){
      setPosts(posts.data.SearchPosts)
    }
    setHasMore(true)
  },[posts.loading, posts.error,searchQuery])

  useEffect(() => {
    if(!users.loading && !users.error){
      setUsers(users.data.searchUsers)
    }
  }, [users.loading, users.error, searchQuery])

  window.onscroll = () =>{
    if(window.innerHeight + window.scrollY > document.body.offsetHeight){
      if(HasMore){
        setLoading(true)
        posts.fetchMore({
          variables:{offset: Posts.length}
        }).then((x)=>{
          // console.log(x)
          if(x.data.SearchPosts.length < 3){
            setHasMore(false);
            setLoading(false);
          }
          setPosts(Posts.concat(x.data.SearchPosts));
          setLoading(false);
        })
      }
    }
  }
  

  return (
    <div className='beige-bg fullscreen center-col'>
        <Navbar></Navbar>
        {/* <UsersSearchTab users= {Users}></UsersSearchTab> */}

        <div className=' mv-30 w-50 center-row space-around'>
          {Filter==='all' && (
            <button className='blue-button-smaller text-white'>
              All
            </button>
          )}
          {Filter!=='all' && (
            <button onClick={()=>{setFilter('all')}} className='white-button-smaller text-white'>
              All
            </button>
          )}
          {Filter==='user' && (
            <button className='blue-button-smaller text-white'>
              User
            </button>
          )}
           {Filter!=='user' && (
            <button onClick={()=>{setFilter('user')}} className='white-button-smaller text-white'>
              User
            </button>
          )}
          {Filter==='post' && (
            <button className='blue-button-smaller text-white'>
              Post
            </button>
          )}
           {Filter!=='post' && (
            <button onClick={()=>{setFilter('post')}} className='white-button-smaller text-white'>
              Post
            </button>
          )}
        </div>

        {(Filter === 'all' || Filter==='user') && (
        <div className='main-container white-bg center-col mv-20'>
            <p className='text-l text-black mb-20'>Users</p>
            {Users.length > 0 && (
              <>
                {Users.map((user:any)=>{
                if(user.id == userContext.user.id){
                  return(
                    <div key={user.id}>

                    </div>
                  )
                }
                return(
                    <div key={user.id} className='w-80 border-sering-pake mv-10 flex-row space-around'>
                        <div className='flex-row' onClick={()=>{navigate(`/profile/${user.id}`)}}>
                          <img className='profile-picture-small p-10' src={user.profile_picture_url} alt=""/>
                          <p className='text-black bold text-m text-center'>{user.first_name +" "+user.last_name}</p>
                        </div>
                        {(!user.connect_request.includes(userContext.user.id) && !user.connected_user.includes(userContext.user.id) ) && (
                          <button onClick={()=>{requestConnection({variables:{id: userContext.user.id, recepient:user.id}}).then(()=>{users.refetch().then((x)=>{setUsers(x.data.searchUsers)})})}} className='blue-button-smaller text-white'>Connect</button>
                        )}
                        {user.connect_request.includes(userContext.user.id) && (
                          <button className='grey-button-smaller text-white'>Requested</button>
                        )}
                        {user.connected_user.includes(userContext.user.id) && (
                          <button className='white-button-smaller text-white'>Connected</button>
                        )}
                    </div>
                )
                })}
              </>
            )}
            {Users.length ===0 && (
                <p className='text-black text-s w-full mv-20'>Empty</p>
            )}
        </div>
        )}

        {(Filter==='all' || Filter ==='post')&&(
          <div className='main-container white-bg center-col mv-20'>
            <p className='text-l text-black mb-20'>Posts</p>
            {Posts.length > 0 && (
              <>
                {Posts.map((post:any)=>{
                    return(
                        <Post key={post.id} post={post} refetch={posts.refetch} length={Posts.length}></Post>
                    )
                })}
              </>
            )}
            {Posts.length ===0 && (
                <p className='text-black text-s w-full mv-20'>Empty</p>
            )}
        </div>
        )}
    </div>
  )
}
