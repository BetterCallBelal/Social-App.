import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginschema } from '../SchemaS/loginSchema' 
import { CounterContext } from '../Contexts/TokenContext'

CounterContext
export default function Login() {

 
  let {setUserToken , UserToken} = useContext(CounterContext)
  let navigate = useNavigate()
 
  const [Loading, setLoading] = useState(false)
  const [logerror, setlogerror] = useState(null)
const {register , handleSubmit ,setError , formState:{errors}, reset}=useForm({
  defaultValues :{
    email :"",
    password :""
  }
  ,
  resolver: zodResolver(loginschema) 
})
function logform(UserData) {
  setLoading(true)
  axios.post("https://route-posts.routemisr.com/users/signin", UserData)
  .then((response)=>{
   if (response.data.message == 'signed in successfully') {
    localStorage.setItem('token', response.data.data.token)
    navigate('/')
    setUserToken(response.data.data.token)
    reset()
   }
  }).catch((error)=>{
    setlogerror(error.response.data.message)
  }).finally(()=>{setLoading(false)})
}
  return (
    
    <div>
 

  <div className="h-full bg-gray-400 dark:bg-gray-900">

    <form onSubmit={handleSubmit(logform)} className="ms-80">
      <div className="flex justify-center px-6 py-12">

        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
        
  
          <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Welcome Back!</h3>
            <div className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
              
               
                
              
              
              <div className="mb-4 lg:ml-5  ">
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="Enter Your Email">
                  Email
                </label>
                <input
                {...register('email')}
                 type="email" 
                className="w-full px-3  py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"  placeholder="Enter Your Email" />
              {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                      )}
              </div>
              <div className="mb-4 lg:ml-5 ">
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="JobType">
                  Password
                </label>
                <input
                 {...register('password')}
                type="password" 
                className="w-1/3 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder='***********' />
                 {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                      )}
              </div>
             {logerror?<span className=" block text-center p-3 mb-5 mx-auto text-white font-bold  bg-red-800 w-3/4 rounded-2xl  text-sm">{logerror}</span>:null }
                 
              <div className="mb-6 text-center">
                <button 
                      className="w-full px-4 py-2 font-bold text-white bg-purple-800 rounded-full hover:bg-blue-700 dark:bg-purple-900 dark:text-white dark:hover:bg-purple-950 focus:outline-none focus:shadow-outline" 
                     
                      isdisabled={Loading} type='submit'>{Loading? "اصبر شويه...":"Log In!"}
                    </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center"> 
              <NavLink 
  to='/signup'   
  className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
>
  NO ACCOUNT? CLICK ME!
</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>

  )
}
