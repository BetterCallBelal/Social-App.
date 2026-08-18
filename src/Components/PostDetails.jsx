import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { RotateLoader } from 'react-spinners';
import { FaceExpressionless } from 'lucide-react';
import PostCard from './PostCard';

export default function PostDetails() {
  const {id} = useParams()
 
  function getSingPost() {
  return  axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
      headers:{
        authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
const {data , isLoading , isError , error} = useQuery({
    queryKey:['getsingpost',id],
    queryFn : getSingPost
  })
  console.log(data);  
 
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
  return (
<><PostCard isSinglePost={true} post={data?.data.data.post}/>
</>


  )
}
