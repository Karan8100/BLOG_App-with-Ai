import React from 'react'
import { Link, } from 'react-router'
import { assets } from '../assets/assets'
import {LogIn} from "lucide-react"
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const { navigate ,token} = useAppContext();

  return (
    <div className='flex justify-between items-center h-16 mx-5 sm:mx-10 md:mx-20 z-10'>
        {/* Logo and title */}
         <Link to="/" className='flex items-center gap-2'>
           <img src={assets.logo} alt="logo" className='size-6 sm:size-9' />
           <span className="text-3xl font-bold font-mono ">
             Blogify
           </span>
         </Link>
       
       <button 
        onClick={()=>{
            navigate("/admin")
        }}
        className='flex gap-2 items-center rounded-full px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white '>
         <span  className='text-2xl '>{token? 'Dashboard' :'Login'}</span>

         <LogIn className='size-6 opacity-70' />
         
         
       </button>
    </div>
  )
}

export default Navbar
