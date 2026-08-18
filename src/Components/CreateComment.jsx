import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function CreateComment({postid , querykey}) {
const query =useQueryClient()
  function createcommentFunc() {
  return  axios.post(`https://route-posts.routemisr.com/posts/${postid}/comments`,formdata , {
      headers :{
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    }
    )
  }
 const{ data,isPending , isError , error , mutate}= useMutation({
    mutationFn:createcommentFunc,
    onSuccess:()=>{
      
      toast.success("Comment Sent")
    query.invalidateQueries({queryKey:querykey})},
      
     onError:()=>{
        
        toast.error("comment failed")
      }
  
  })
  
  
const {register , handleSubmit , reset}=useForm({
  defaultValues:{
    content : "",
    image : ""
  }
})


let formdata = new FormData()
function sendComment(coData){

  
  if(!coData.content&& !coData.image[0])return
  if(coData.content){
    formdata.append('content',coData.content)
  }
    if(coData.image[0]){
    formdata.append('image',coData.image[0])
  }
  mutate()
reset()
}




  return (
  <><form onSubmit={handleSubmit(sendComment)} className="join w-full mx-30">
  <div>
  
    <label className="input join-item ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
</svg>

      <input {...register('content')} type="text" placeholder="Enter Your Comment"  />
    
    </label>
  </div>
  <label className="btn btn-neutral join-item cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
    <input {...register('image')} disabled={isPending} type="file" className="hidden" />
  </label>
 <button disabled={isPending}  type="submit" className="btn btn-neutral join-item">
{isPending? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>}
  
</button>
 
</form>
  </>
  )
}
