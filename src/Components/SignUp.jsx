import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useContext, useState } from 'react'  
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'  
import { schema } from '../SchemaS/SignUpSchema'
import CounterContextProvider, { CounterContext } from '../Contexts/TokenContext'




export default function SignUp() {
let {setUserToken , UserToken} = useContext(CounterContext)

 
   let navigate = useNavigate()
  const [Loading, setLoading] = useState(false)
  const [apierror, setapierror] = useState(null)
  const { register, handleSubmit, setError, formState: { errors,  } , reset} = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    resolver: zodResolver(schema)
  });

  function sendForm(UserData) {
    setLoading(true)
   axios.post('https://route-posts.routemisr.com/users/signup',UserData)
   .then((response)=>{
    if(response.data.message === 'account created'){
      localStorage.setItem('token' , response.data.data.token )
      navigate("/login")
      setUserToken(response.data.data.token)
      reset()
    }
   })
   .catch((error)=>{
    setapierror(error.response.data.message);
   }).finally(()=>{setLoading(false)})

  }

  return (
    <div className='bg-gray-500 min-h-screen py-10'>
      <form onSubmit={handleSubmit(sendForm)} className="h-full">
        <div className="ms-80">
          <div className="flex justify-center px-6 py-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
                
                <div className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                  
                 
                  <div className="mb-4 md:flex md:justify-around">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="name">
                        Name
                      </label>
                      <input 
                        {...register('name')} 
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"  
                        type="text" 
                        placeholder="Choose A Name" 
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                      )}
                    </div>
                    <div className="md:ml-2">
                      <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="username">
                        UserName
                      </label>
                      <input 
                        {...register('username')}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"  
                        type="text" 
                        placeholder="Choose A Username" 
                      />
                      {errors.username && (
                        <span className="text-red-500 text-sm">{errors.username.message}</span>
                      )}
                    </div>
                  </div>

         
                  <div className="md:ml-2 mb-5">
                    <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                      Email
                    </label>
                    <input 
                      {...register('email')} 
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"  
                      type="email" 
                      placeholder="Choose An Email" 
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                  </div>

       
                  <div className="mb-4 md:flex md:justify-around">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                        Password
                      </label>
                      <input 
                        {...register('password')}  
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                        type="password" 
                        placeholder="**********" 
                      />
                      {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                      )}
                    </div>
                    <div className="md:ml-2">
                      <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="rePassword">
                        RePassword
                      </label>
                      <input 
                        {...register('rePassword')} 
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                        type="password" 
                        placeholder="**********" 
                      />
                      {errors.rePassword && (
                        <span className="text-red-500 text-sm">{errors.rePassword.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 md:flex md:justify-around">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label className="block mb-2 text-sm font-bold dark:text-white" htmlFor="gender">
                        Gender
                      </label>
                      <select  
                        {...register('gender')}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select gender</option>  
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      {errors.gender && (
                        <span className="text-red-500 text-sm">{errors.gender.message}</span>
                      )}
                    </div>
                    <div className="md:ml-2">
                      <label className="block mb-2 text-sm font-bold dark:text-white" htmlFor="dateOfBirth">
                        Date of Birth
                      </label>
                      <input  
                        {...register('dateOfBirth')}
                        className="w-full px-3 py-2 text-sm leading-tight dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="date"
                      />
                      {errors.dateOfBirth && (
                        <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
                      )}
                    </div>
                  </div>
                      {apierror? <div className='text-2xl text-center p-2.5 w-9/12  mx-auto mb-3 rounded-4xl bg-red-700'>{apierror}</div>: null }
                 
                  <div className="mb-6 text-center">
                    <button 
                      className="w-full px-4 py-2 font-bold text-white bg-purple-800 rounded-full hover:bg-blue-700 dark:bg-purple-900 dark:text-white dark:hover:bg-purple-950 focus:outline-none focus:shadow-outline" 
                     type='submit'
                      disabled={Loading} >{Loading? "اصبر شويه...":"Sign Up Now!"}
                    </button>
                  </div>
                 

                  <hr className="mb-6 border-t" />
                  
                  <div className="text-center">
                    <NavLink 
                      to='/login' 
                      className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Already have an account? Login!
                    </NavLink>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}