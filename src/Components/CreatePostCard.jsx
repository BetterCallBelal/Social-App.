import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { CounterContext } from "../Contexts/TokenContext";
export default function CreatePostCard() {
  
    const [Handleimg, setHandleimg ] = useState(null);
  let query = useQueryClient()
let image = useRef(null)
let body = useRef(null)
  function preparedata(){
        let formdata = new FormData()
            
             if(body.current.value){
        formdata.append('body', body.current.value)
    }
    if(image.current.files[0]){
formdata.append('image', image.current.files[0])
    } 
        return formdata
        

        
    }
    function createPostFunc(){
     return   axios.post('https://route-posts.routemisr.com/posts' ,preparedata() ,{headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }})
    }
 const {data  , isPending , mutate , }=   useMutation(
        {
         mutationFn :createPostFunc,
         onSuccess:()=>{
                
               toast.success("Post Sent")
               query.invalidateQueries('getPosts')
     

            },
               
              onError:()=>{
                 
                 toast.error("Post failed")
               }
               
        }
    )
const { Userdata } = useContext(CounterContext)  
   
function HandleImageFunc(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (Handleimg) URL.revokeObjectURL(Handleimg);

  const ImgSrc = URL.createObjectURL(file);
  setHandleimg(ImgSrc);
}

const DeleteImg = () => {
  if (Handleimg) URL.revokeObjectURL(Handleimg);
  setHandleimg(null);


  }
  return (
    <>
    <div className='mt-4'>
    <div className='mx-120 py-4 px-9 border-2 border-gray-500 rounded-4xl '>
      <div className="avatar">
  <div className="w-14 rounded-4xl">
    <img alt="Tailwind-CSS-Avatar-component" src={Userdata?.photo} />
  </div>

<button className="" onClick={()=>document.getElementById('my_modal_1').showModal()}><input 
  type="text"
  placeholder="have a story ? Tell us!" 
  readOnly
  onClick={() => document.getElementById('my_modal_7')}
  className="input input-md h-10  rounded-4xl ms-3 w-105 cursor-pointer"
/></button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Ready?!...Post!</h3>
    <div className='flex '>
      <p className="py-4"><textarea ref={body} className="textarea w-100" placeholder="Bio"></textarea></p>
 <input onChange={HandleImageFunc} ref={image} type="file" className='hidden' id='ch' />
 <label htmlFor="ch"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer mt-17.5 ms-2.5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
</svg>

</label>

    </div>
<div className='relative'>
  {Handleimg && (
    <>
      <img src={Handleimg} alt="" className="rounded-2xl w-full" />
      <svg 
        onClick={DeleteImg} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="size-6 absolute top-3 right-5 cursor-pointer bg-base-100/70 rounded-full"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </>
  )}
</div>
    <div className="modal-action">
      
      <form method="dialog" className='flex gap-2.5'>
      
        <button className="btn">Close</button>
        <button onClick={mutate} className="btn">Post</button>
      </form>
    </div>
  </div>
</dialog>
</div>

{/* <label htmlFor="my_modal_7" className="ms-3">
 <input 
  type="text"
  placeholder="have a story ? Tell us!" 
  readOnly
  onClick={() => document.getElementById('my_modal_7').checked = true}
  className="input input-md h-10 rounded-4xl ms-3 w-full cursor-pointer"
/>
</label>


<input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Hello!</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
  </div>
  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
</div> */}

    </div>
    
  </div></>
  )
}
