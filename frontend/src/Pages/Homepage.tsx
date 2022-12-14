import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import { UserAuth } from '../../contexts/authContext'
import { getPosts } from '../../queries/queries';
import CreatePostModal from '../Components/CreatePostModal';
import Navbar from '../Components/Navbar'
import Post from '../Components/Post';
export default function Homepage() {
  const userContext = UserAuth()
  const [AddPost, setAddPost] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Posts, setPosts] = useState([]);
  const [HasMore, setHasMore] = useState(true)

  const toggleAddPost = () =>{
    setAddPost(!AddPost);
  }

  useEffect(() => {
    if( AddPost === true){
        document.body.style.overflow="hidden";
    }else{
        document.body.style.overflow = "visible"
    }
  }, [AddPost])

  const {loading, error, data, refetch, fetchMore} = useQuery(getPosts, {
    variables:{
      id: userContext.user.id,
      limit: 3,
      offset: 0
    }
  })

  useEffect(() => {
    if(!loading && !error){
      setPosts(data.GetPosts);
      setLoading(false);
    }
  }, [loading, error, data])
  

  window.onscroll = () =>{
    if(window.innerHeight + window.scrollY > document.body.offsetHeight){
      if(HasMore){
        setLoading(true)
        fetchMore({
          variables:{offset: Posts.length}
        }).then((x)=>{
          if(x.data.GetPosts.length < 3){
            setHasMore(false);
            setLoading(false);
          }
          setPosts(Posts.concat(x.data.GetPosts));
          setLoading(false);
        })
      }
    }
  }

  
  return (
    <div className='beige-bg fullscreen center-col'>
        <Navbar></Navbar>
        {AddPost && (
          <CreatePostModal toggle ={toggleAddPost} refetch={refetch}></CreatePostModal>
        )}
        <div className='main-container white-bg center-row mv-20'>
          <img src={userContext.user.profile_picture_url} className='homepage-picture mh-20'></img>
          <button onClick={toggleAddPost} className='white-button'>
            <p className='text-s bold'>Start a Post</p>
          </button>
        </div>
        
        {Posts.length>0 && (
        <div className='w-630 mb-30 center-col'>
          {(!loading && !error) && (
            Posts.map((post:any)=>{
              return(
                <Post key={post.id} post={post} refetch={refetch} length={Posts.length}></Post>
              )
            })
          )}
          {(Loading) && (
              <p className='text-blue text-m bold mh-20'>Loading...</p>
          )}  
        </div>
        )}
    </div>
  )
}
