import React, { useEffect, useState } from 'react'

import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';

const ListBlog = () => {
    const [blogs,setBlogs] = useState([]);
    const {axios} = useAppContext();

    const fetchBlogs = async ()=>{
      try{
        //calling getallblogsAdmin
        const {data} = await axios.get('/auth/blogs');
        if(data.success){
          setBlogs(data.blogs);
        }else{
          toast.error(data.message || "failed to fetch blogs for admin ")
        }
        
      }catch(error){
        toast.error(error.message);
      }
    }

    useEffect(()=>{
      fetchBlogs();

    },[])
  return (
    <div className=" flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All Blogs</h1>
      <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg  bg-white mt-3">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4">
                #
              </th>
              <th scope="col" className="px-2 py-4 xl:px-6">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4  max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr> 
          </thead>

          <tbody>
            {blogs.map((blog, index) => {
              return (
                <BlogTableItem
                  blog={blog}
                  key={blog._id}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlog
