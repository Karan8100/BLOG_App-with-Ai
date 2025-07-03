import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
      {/* Logo + Name */}
      <div className='sm:max-w-[200px]'>
      <div className="flex flex-col sm:flex-row items-start sm:items-center  sm:gap-2">
        <img
          src={assets.logo} // Change to your actual logo path
          alt="Logo"
          
        />
        <span className='text-3xl font-bold text-black'>Blogify</span>
      </div>
      <p className="text-sm text-gray-600 mt-2 max-w-xs">
  MyBlogSite is your go-to destination for insightful articles, the latest tech updates, travel inspiration, and health tips — all in one place. We aim to inform, inspire, and ignite curiosity.
 </p>
      
        
      </div>
      

      {/* Links */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold mb-1">Links</h3>
        <a href="/about" className="hover:text-blue-500 transition">About</a>
        <a href="/contact" className="hover:text-blue-500 transition">Contact</a>
        <a href="/privacy" className="hover:text-blue-500 transition">Privacy Policy</a>
      </div>

      {/* Social or extra (optional) */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold mb-1">Connect</h3>
        <a href="mailto:upadhyaykaran04@gmail.com" className="hover:text-blue-500 transition">Email</a>
        <a href="https://github.com/yourusername" target="_blank" className="hover:text-blue-500 transition">GitHub</a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" className="hover:text-blue-500 transition">LinkedIn</a>
      </div>
    </div>

    {/* Divider */}
    <hr className="border-gray-300 my-6" />

    {/* Copyright */}
    <p className="text-center text-sm text-gray-500 pb-6">
      &copy; {new Date().getFullYear()} MyBlogSite. All rights reserved.
    </p>
  </footer>
  )
}

export default Footer
