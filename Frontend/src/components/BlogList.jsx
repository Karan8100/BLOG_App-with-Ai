import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import { motion} from "framer-motion"
import { useAppContext } from '../context/AppContext'
import BlogCard from './BlogCard'

const BlogList = () => {
  const { blogs, input } = useAppContext();
  const [selectedCategory,setSelectedCategory] = useState("All");
  
  const Filtered_blogs = selectedCategory === "All"
  ? blogs : blogs.filter((blog)=> blog.category === selectedCategory);

  

  //now we will filter blogs on search input
  const  filteredBlogs = ()=>{
    if(input.trim() === ""){
      return blogs;
    }
    return blogs.filter((blog)=> 
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.description.toLowerCase().includes(input.toLowerCase()) || 
      blog.category.toLowerCase().includes(input.toLowerCase())
    );
  }
  return (
    <div>
      <div className='flex justify-center gap-4 items-center sm:gap-8 my-10 relative z-10'>
        {blogCategories.map((cat)=>(
            <div key={cat} className=''>
                <motion.button 
                 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                 layout
                 whileHover={{ scale: 1.05}}
                 
                onClick={()=>{
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 cursor-pointer rounded-md  ${selectedCategory===cat ? "bg-blue-600":""}`}>
                    {cat}
                </motion.button>
            </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 my-12 relative z-10 '>
        {/* Blog CARD */}
        {(filteredBlogs().length>0 || Filtered_blogs.length >0 )? (
           filteredBlogs().filter((blog)=> selectedCategory === "All" ? true : blog.category === selectedCategory).map((blog) => (
             <BlogCard key={blog._id} blog={blog} />

        ))) : (
          <p className="text-center text-gray-500 col-span-full">No blogs found.</p>
        )
        }

        


      </div>
    </div>
  )
}

export default BlogList
