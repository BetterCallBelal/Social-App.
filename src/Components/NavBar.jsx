import React, { useContext } from 'react'
import { ZodiacCancer } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { CounterContext } from '../Contexts/TokenContext';

export default function NavBar() {
 let navigate = useNavigate()
 function Logout() {
    localStorage.removeItem('token')
    setUserToken(null)  
    navigate("/login")  
  }
 const{UserToken , setUserToken , Userdata}= useContext(CounterContext)
  return (
   <div className='sticky top-0 z-50'>
   <nav className="bg-white  border-gray-200 py-2.5 shadow-md dark:bg-gray-900">
  <div className="flex flex-wrap items-center justify-around  px-4 mx-auto">
     <NavLink to='/' className="flex items-center">
  <ZodiacCancer size={32} color="#ff00ea" />
  <span className="self-center ms-1.5 text-xl font-bold whitespace-nowrap dark:text-white">
    Social App
  </span>
</NavLink>
      <div className="flex items-center lg:order-2">
        <div className="hidden mt-2 mr-4 sm:inline-block">
          <span />
        </div>
        
         {UserToken == null? <NavLink to='/login'  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-900 focus:outline-none dark:focus:ring-purple-800">Login</NavLink> :null }
       
        {UserToken == null? <NavLink to='/signup'  className="text-white ms-3 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-900 focus:outline-none  dark:focus:ring-purple-800">Sign Up</NavLink> :null }

      {UserToken !== null ? (
  <>
    <span>Welcome <span className='font-extrabold text-cyan-500'>{Userdata?.name}</span>!</span>
    <button 
      onClick={Logout}  
      className="text-white ms-4 bg-red-600 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-red-600 dark:hover:bg-red-900 focus:outline-none dark:focus:ring-purple-800 inline-flex items-center gap-2"
    >
      Logout 
      <LogOut size={15} color="#ffffff" />
    </button>
  </>
) : null}
        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="true">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          <li>
          <div className='flex gap-5'>
             <NavLink 
  to='/' 
  className="block py-2 pl-3 pr-4 bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white font-bold text-gray-700"
>
  Home
</NavLink>
 <NavLink 
  to='/profile' 
  className="block py-2 pl-3 pr-4 bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white font-bold text-gray-700"
>
  Profile
</NavLink>
          </div>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
</div>

  )
}
