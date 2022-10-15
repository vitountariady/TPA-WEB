import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchPosts, SearchUsers } from '../../queries/queries'
import Navbar from '../Components/Navbar'
import Post from '../Components/Post'
import UsersSearchTab from '../Components/UsersSearchTab'

export default function SearchPage() {
  const [Posts, setPosts] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [HasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  
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

        <div className='main-container white-bg center-col mv-20'>
            <p className='text-l text-black mb-20'>Users</p>
            {Users.length > 0 && (
              <>
                {Users.map((user:any)=>{
                return(
                    <div onClick={()=>{navigate(`/profile/${user.id}`)}} className='w-80 border-sering-pake mv-10 flex-row space-around'>
                        <img className='profile-picture-small p-10' src={user.profile_picture_url} alt=""/>
                        <p className='text-black bold text-m text-center'>{user.first_name +" "+user.last_name}</p>
                    </div>
                )
                })}
              </>
            )}
            {Users.length ===0 && (
                <p className='text-black text-s w-full mv-20'>Empty</p>
            )}
        </div>

        <div className='main-container white-bg center-col mv-20'>
            <p className='text-l text-black mb-20'>Posts</p>
            {Posts.length > 0 && (
              <>
                {Posts.map((post:any)=>{
                    console.log(post)
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
    </div>
  )
}
