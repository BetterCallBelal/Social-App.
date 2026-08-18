import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useState } from 'react'
import PostCard from './PostCard';
import { RotateLoader } from 'react-spinners';
import { FaceExpressionless } from 'lucide-react';
import CreatePostCard from './CreatePostCard';


export default function Home() {

  function getPosts() {
  return  axios.get('https://route-posts.routemisr.com/posts', {
   
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
const {data , isLoading , isError , error}=useQuery({
  queryKey :['getPosts'],
  queryFn : getPosts
})

if (isLoading) {
  return <div className='h-screen flex justify-center items-center'>
    <RotateLoader  />
  </div>
}
if (isError) {
  return<div className='h-screen flex justify-center flex-col items-center'>
<FaceExpressionless size={400} />
 <h1>No Posts Here</h1>
  </div>
  
}

 const posts = data?.data.data.posts 

 
  return (<>
  
 <div className='bg-blue-950 flex flex-col'>
  <CreatePostCard/>
   {posts?.map((post) => (
          <PostCard key={post.id} post={post} />  
        ))}
        
 </div>
 </>
  )
}
