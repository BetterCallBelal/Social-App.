import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import PostCard from './Components/PostCard'
import PostDetails from './Components/PostDetails'
import SignUp from './Components/SignUp'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Home from './Components/Home'
import Layout from './Components/Layout'
import Profile from './Components/Profile'
import NotFound from './Components/NotFound'
import { useNetworkState } from 'react-use'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios';
import { CounterContext } from './Contexts/TokenContext'
import CounterContextProvider from './Contexts/TokenContext'
import ProtectRoute from './ProtectRoute/ProtectToken'
import ProtectAuth from './ProtectRoute/ProtectAuth'
import { QueryClientProvider , QueryClient} from '@tanstack/react-query'
const queryclient = new QueryClient()
 import { ToastContainer, toast } from 'react-toastify';
import { ZodiacCancer } from 'lucide-react'
const router = createBrowserRouter ( [
  {path : "/" , element : <Layout/> , children:[
    { index : true, element : <ProtectRoute><Home /></ProtectRoute> },
  {path : "/postdetails/:id" , element : <ProtectRoute><PostDetails /></ProtectRoute> },
  {path : "/profile" , element : <ProtectRoute><Profile /></ProtectRoute> },
  {path :"/login" , element :  
    <ProtectAuth><Login/></ProtectAuth>
  },
  {path : "signup" , element : <ProtectAuth><SignUp/></ProtectAuth> },
  ] },
  
  {path : "*" , element : <NotFound/> },

])





function App() {
 let {online }= useNetworkState()

  return (
   <>
   {!online ?   <div className='min-h-screen bg-gray-300 flex  zIndex: 1  justify-center items-center inset-0 fixed '><h2 className=' text-3xl flex'><ZodiacCancer size={50} color="#ff00ea" />Network Issue... </h2></div>
:null}
   <QueryClientProvider client={queryclient}>
    <CounterContextProvider >
       <RouterProvider router={router}/>
       <ToastContainer />
    </CounterContextProvider>
</QueryClientProvider>
   </>
  )
}

export default App
