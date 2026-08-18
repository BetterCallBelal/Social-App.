import React, {  useContext } from 'react'
import { CounterContext } from "../Contexts/TokenContext";
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PostCard from './PostCard';
import { Key } from 'lucide-react';
export default function Profile() {

const { UserToken, Userdata } = useContext(CounterContext)   


let userId = Userdata?.id
function GetpPosts(){
  return  axios.get(`https://route-posts.routemisr.com/users/${userId}/posts`,{
  headers : {Authorization:`Bearer ${localStorage.getItem('token')}`}
})
}
 const {data}= useQuery({
  queryKey : ['GetpPosts'],
  queryFn : GetpPosts,
  enabled: !!userId,
 
 })



 
  return (
   <>
    <div className="bg-white dark:bg-gray-800 mx-auto mt-9 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden transition-all duration-300 hover:shadow-indigo-500/50 dark:hover:shadow-blue-900/50">
  <div className="relative h-32 mx-auto   from-indigo-600 to-blue-700">
    <img src={Userdata?.photo} alt="John Doe" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-105" />
  </div>
  <div className="pt-16 pb-6 px-6 text-center">
    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{Userdata?.name}</h1>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{Userdata?.username}</p>
  <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
  {Userdata?.dateOfBirth && new Date(Userdata?.dateOfBirth).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}
</p>
    
  
    <div className="flex justify-center space-x-2">
      <div className='bg-indigo-100 text-indigo-800 rounded-3xl transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700'>
        <h1 className='font-bold'>{Userdata?.bookmarksCount}</h1>
        <span className="px-3 py-1 text-sm line-clamp-2">bookmarksCount</span>
      </div>
      <div className='bg-indigo-100 text-indigo-800 rounded-3xl transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700'>
        <h1 className='font-bold'>{Userdata?.followingCount}</h1>
        <span className="px-3 py-1 text-sm line-clamp-2">following</span>
      </div>
       <div className='bg-indigo-100 text-indigo-800 rounded-3xl transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700'>
        <h1 className='font-bold'>{Userdata?.followersCount}</h1>
        <span className="px-3 py-1 text-sm line-clamp-2">followers</span>
      </div>
    </div>
  </div>
  
</div>
<div className='mt-3'>
 {data?.data.data.posts.map((post) => (
  <PostCard key={post?._id} post={post} />
))}
</div>
</>
  )
}
