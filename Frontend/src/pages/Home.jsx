import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='p-4 sm:p-6 '>
      <Navbar/>
      <Header/>
      <BlogList/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default Home
