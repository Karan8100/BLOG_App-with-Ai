import React from 'react'
import {motion} from "framer-motion"
import { useNavigate } from 'react-router';


const BlogCard = ({blog}) => {
    const {title,description,category,image,_id} = blog;
    const shortDesc = description.length >50 ? description.slice(0,50) + "...":description;
    const navigate = useNavigate();
  return (
    <motion.div
    className="bg-white rounded-xl shadow-md cursor-pointer overflow-hidden max-w-sm"
    whileHover={{ scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    onClick={()=>
        navigate(`/blog/${_id}`)
    }
  >
    <img src={image} alt={title} className="h-48 w-full object-cover" />
    <div className="p-4">
      <span className="text-sm text-blue-500 font-medium">{category}</span>
      <h2 className="text-xl font-semibold mt-1">{title}</h2>
      <p className="text-gray-600 mt-2 text-sm" dangerouslySetInnerHTML={{"__html":shortDesc}}></p>
    </div>
  </motion.div>
  )
}

export default BlogCard
