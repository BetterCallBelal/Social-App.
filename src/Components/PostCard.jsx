import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CreateComment from './CreateComment';
import { toast } from 'react-toastify';
import { CounterContext } from '../Contexts/TokenContext';


export default function PostCard({ post, isSinglePost = false }) {
const query = useQueryClient()
  function getComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${post.id}/comments`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  const { data } = useQuery({
    queryKey: ['getComments', post?.id],
    queryFn: getComments,
    enabled: isSinglePost
  });

  const comments = data?.data?.data?.comments || [];
function deletepost(){
  return axios.delete(`https://route-posts.routemisr.com/posts/${post.id}`,
    {
      headers :{  authorization: `Bearer ${localStorage.getItem('token')}`}
    }
  )
}
const { data: Deldata, mutate: DelMutate } = useMutation({
  mutationFn: deletepost,
  onSuccess: () => {
    toast.success("Delete Completed");
    query.invalidateQueries({
      queryKey: isSinglePost ? ['getsingpost'] : ['getPosts'],
    });
    query.invalidateQueries({
      queryKey: ['GetpPosts'],
    });
  },
  onError: () => {
    toast.error("Cannot Delete This!");
  }
});
  function LikePost(){
    return axios.put(`https://route-posts.routemisr.com/posts/${post.id}/like`, {} , 
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
  }
const { data : likedata , isPending:likePending , mutate : likemutate} = useMutation({
    mutationFn :LikePost,
   onSuccess:()=>{
               query.invalidateQueries({
  queryKey: isSinglePost ? ['getsingpost'] : ['getPosts']
})    ,
query.invalidateQueries({
  queryKey: ['GetpPosts']
})
                
               }
                  
                
                  
    
  })
  //Update
  const { Userdata } = useContext(CounterContext)  
    const [Handleimg, setHandleimg ] = useState(null);

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

function createUpdataFunc(){
     return   axios.put(`https://route-posts.routemisr.com/posts/${post.id}` ,preparedata() ,{headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }})
    }
 const {data:Udata  , isPending:Uispending , mutate :Uupdate }=   useMutation(
        {
         mutationFn:createUpdataFunc,
         onSuccess:()=>{
                
               toast.success("Post Changed")
               query.invalidateQueries({
  queryKey: isSinglePost ? ['getsingpost'] : ['getPosts']
})    ,
query.invalidateQueries({
  queryKey: ['GetpPosts']
})
     

            },
               
              onError:()=>{
                 
                 toast.error("Post Updated failed")
               }
               
        }
    )



  //Update
  const [isOpen, setIsOpen] = useState(false);
const modalRef = useRef(null);
  
  return (
   

  <div className="w-full max-w-xl mx-auto mt-3">
      <div className="bg-stone-700 rounded-4xl shadow-xl border border-stone-700 overflow-hidden h-full">
        <div className="p-4">

         
            <div className="flex justify-between items-start mb-3">
              
              <div className="flex items-center space-x-3">
                <img
                  className="w-12 h-12 rounded-full object-cover border-2 border-stone-600"
                  src={
                    post?.user?.photo ||
                    `https://ui-avatars.com/api/?name=${post?.user?.name || 'User'}&background=4a5568&color=fff&size=128`
                  }
                  alt="User Avatar"
                />
                <div className="text-sm min-w-0">
                  <span className="font-semibold text-white hover:underline hover:text-blue-400 cursor-pointer">
                    {post?.user?.name || 'Unknown User'}
                  </span>
                  <p className="text-xs text-stone-400 truncate">
                    @{post?.user?.username || 'user'}
                  </p>
                  <p className="text-xs text-stone-500">
                    {new Date(post?.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              
             <div className='flex gap-2.5' onClick={(e) => e.stopPropagation()}>
<div className={`dropdown me-2 ${isOpen ? "dropdown-open" : ""}`}>
    <div
      tabIndex={0}
      role="button"
      className="btn m-1"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      Menu
    </div>

    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-25 p-2 shadow-sm">
      <li>
        <button
          className=" w-fit font-bold"
          onClick={() => {
            setIsOpen(false);
            modalRef.current.showModal();
          }}
        >
          Update
        </button>
      </li>
      <li onClick={() => { setIsOpen(false); DelMutate(); }}>
        <a className="font-bold w-fit text-red-700">Delete</a>
      </li>
    </ul>
  </div>

  <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
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
        <button onClick={Uupdate} className="btn">Update</button>
      </form>
    </div>
  </div>
  </dialog>

   {isSinglePost?null :<NavLink to={`/postdetails/${post?._id}`} ><button className='p-1 bg-black rounded-xl mt-1.5 cursor-pointer' > <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth={1.5} stroke="currentColor" className="size-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
</svg></button>

              </NavLink>}
</div>
            </div>
        

          <div className="text-sm text-stone-200 mb-3 leading-relaxed">
            <p>{post?.body || 'No content available'}</p>
          </div>


          {post?.image && (
            <div className="mb-3 -mx-4 sm:mx-0 sm:rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt="Post media"
                className="w-full h-48 object-cover"
              />
            </div>
          )}

 
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <div className="flex items-center space-x-1">
              <button >
                <svg  className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.1959 6.98709C17.5699 4.89134 14.3061 5.24282 13.1635 7.63669C12.6965 8.61527 11.3035 8.61527 10.8365 7.63669C9.69394 5.24282 6.43011 4.89135 4.8041 6.98709L4.49475 7.38581C3.08665 9.2007 3.28996 11.7888 4.96418 13.3616L11.9168 19.8928C11.9479 19.922 11.9753 19.9477 12 19.9708C12.0247 19.9477 12.0521 19.922 12.0832 19.8928L19.0358 13.3616C20.71 11.7888 20.9133 9.2007 19.5052 7.38581L19.1959 6.98709ZM12 6.62866C13.7697 3.5573 18.1553 3.19885 20.381 6.06759L20.6904 6.46631C22.5728 8.89249 22.301 12.3524 20.0628 14.4548L13.0927 21.0026C12.9885 21.1005 12.8747 21.2075 12.7673 21.2902C12.6438 21.3853 12.4712 21.4954 12.2407 21.5406C12.0818 21.5718 11.9182 21.5718 11.7593 21.5406C11.5288 21.4954 11.3562 21.3853 11.2327 21.2902C11.1253 21.2075 11.0115 21.1005 10.9073 21.0026L3.93717 14.4548C1.69903 12.3524 1.42724 8.8925 3.30962 6.46632L3.61898 6.06759C5.84473 3.19885 10.2303 3.55729 12 6.62866Z"
                  fill="currentColor"
                />
              </svg>
              </button>
             <button > <span >{post?.likesCount || 0}</span></button>
            </div>
            <div className="space-x-2">
              <span>{post?.commentsCount || 0} comments</span>
              <span>•</span>
              <span>{post?.sharesCount || 0} reposts</span>
            </div>
          </div>

  
          <div className="border-t border-stone-700 pt-2 flex justify-around text-sm font-medium text-stone-400">
            <button className="flex items-center space-x-1.5 hover:bg-stone-700 hover:text-stone-200 p-2 rounded w-full justify-center transition-all">
              <svg onClick={likemutate} className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.1959 6.98709C17.5699 4.89134 14.3061 5.24282 13.1635 7.63669C12.6965 8.61527 11.3035 8.61527 10.8365 7.63669C9.69394 5.24282 6.43011 4.89135 4.8041 6.98709L4.49475 7.38581C3.08665 9.2007 3.28996 11.7888 4.96418 13.3616L11.9168 19.8928C11.9479 19.922 11.9753 19.9477 12 19.9708C12.0247 19.9477 12.0521 19.922 12.0832 19.8928L19.0358 13.3616C20.71 11.7888 20.9133 9.2007 19.5052 7.38581L19.1959 6.98709ZM12 6.62866C13.7697 3.5573 18.1553 3.19885 20.381 6.06759L20.6904 6.46631C22.5728 8.89249 22.301 12.3524 20.0628 14.4548L13.0927 21.0026C12.9885 21.1005 12.8747 21.2075 12.7673 21.2902C12.6438 21.3853 12.4712 21.4954 12.2407 21.5406C12.0818 21.5718 11.9182 21.5718 11.7593 21.5406C11.5288 21.4954 11.3562 21.3853 11.2327 21.2902C11.1253 21.2075 11.0115 21.1005 10.9073 21.0026L3.93717 14.4548C1.69903 12.3524 1.42724 8.8925 3.30962 6.46632L3.61898 6.06759C5.84473 3.19885 10.2303 3.55729 12 6.62866Z"
                  fill="currentColor"
                />
              </svg>
              <span onClick={likemutate}>Like</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:bg-stone-700 hover:text-stone-200 p-2 rounded w-full justify-center transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:bg-stone-700 hover:text-stone-200 p-2 rounded w-full justify-center transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  d="M6,14V9A6,6,0,0,1,16.89,5.54"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M18,10v5A6,6,0,0,1,7.11,18.46"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <polyline
                  points="8 12 6 14 4 12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <polyline
                  points="16 12 18 10 20 12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>Repost</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:bg-stone-700 hover:text-stone-200 p-2 rounded w-full justify-center transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              <span>Send</span>
            </button>
          </div>

          <CreateComment postid={post.id} querykey={isSinglePost?[`getComments`] :[`getPosts`] }/>
         
          {isSinglePost && (
            <div className="mt-4 pt-4 border-t border-stone-700">
              <h4 className="text-white font-semibold mb-3">
                All Comments ({comments.length})
              </h4>

              {comments.length === 0 ? (
                <div className="text-stone-400 text-sm text-center py-4">
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                <div className="space-y-3  overflow-y-auto pr-2">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-stone-700/30 p-3 rounded-lg"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          className="w-8 h-8 rounded-full object-cover "
                          src={
                            comment.commentCreator?.photo ||
                            `https://ui-avatars.com/api/?name=${comment.commentCreator?.name || 'User'}&background=4a5568&color=fff&size=64`
                          }
                          alt="User"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-medium">
                              {comment.commentCreator?.name || 'Unknown'}
                            </p>
                            <p className="text-stone-500 text-xs">
                              {new Date(comment.createdAt).toLocaleDateString(
                                'en-US',
                                { month: 'short', day: 'numeric', year: 'numeric' }
                              )}
                            </p>
                          </div>
                          {comment.content && (
                            <p className="text-stone-300 text-sm mt-1">
                              {comment.content}
                            </p>
                          )}
                          {comment.image && (
                            <div className="mt-2 rounded-lg overflow-hidden ">
                              <img
                                src={comment.image}
                                alt="Comment media"
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                     <div className='flex flex-row-reverse gap-2'>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4  hover:text-red-600">
  <path strokeLinecap="round" strokeLiteminejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
                     </div>


                    </div>
                  ))}
                  
                </div>
                
              )}
            </div>
          )}

          {!isSinglePost && post?.topComment && (
            <div className="pt-2 px-5 border rounded-3xl mt-3">
              <div className="flex gap-3">
                <div>
                  <img
                    className="w-8 h-8 rounded-full object-cover border border-stone-600"
                    src={
                      post?.topComment?.commentCreator?.photo ||
                      `https://ui-avatars.com/api/?name=${post?.topComment?.commentCreator?.name || 'User'}&background=4a5568&color=fff&size=64`
                    }
                    alt="Top commenter"
                  />
                </div>
                <div className="flex flex-col mb-1.5 w-full">
                  <div>
                    <h1 className="font-bold text-white text-sm">
                      {post?.topComment?.commentCreator?.name || 'Unknown'}
                    </h1>
                  </div>
                  <p className="text-xs text-stone-400">
                    {new Date(post?.topComment?.createdAt).toLocaleDateString(
                      'en-US',
                      { month: 'short', day: 'numeric', year: 'numeric' }
                    )}
                  </p>
                  <div className="border border-stone-600 rounded-4xl py-2 px-3 mt-2">
                    <p className="text-sm text-stone-300">
                      {post?.topComment?.content}
                    </p>
                    {post?.topComment?.image && (
    <img
      src={post.topComment.image}
      alt="Top comment media"
      className="mt-2 rounded-lg  w-full h-auto object-cover"
    />
  )}
                    
                  </div>
                  
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}