import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import { format } from "date-fns";

import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

// hwere we will get data of blog from backend

const Blog = () => {
  const { id } = useParams();

  const {axios} = useAppContext();
  const [data, setData] = useState(null);
  const [comments,setComments] = useState([]);

  const[name,setName] = useState("");
  const[content,setContent] = useState("");

  const fetchBlogData = async () => {
    //we will fetch a single blog by its id
    
    try{
      const {data} = await axios.get(`/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message);
    }catch(err){
      toast.error(err.message || "failed to fetch blog")
    }
   
  };

   const fetchComments = async () =>{
    try {
      const { data } = await axios.get(`/blog/comments/${id}`);
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message || "failed to fetch comments");
    }
   } 
  
   const addComment = async (e)=>{
     e.preventDefault();
     try{
       const { data } = await axios.post("/blog/addComment",{blog:id,name,content});
       if(data.success){
         toast.success("Comment added successfully");
         setName("");
         setContent("");
         //we will fetch comments again
         fetchComments();
       }
     }catch(err){
       toast.error(err.message || "failed to add comment");
     }

   }
  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);
  return (
    <div>
      {data ? (
        <div className="relative z-0">
          <img
            src={assets.gradientBackground}
            alt=""
            className="absolute top-12 z-1 opacity-70"
          />
          <Navbar />
          {/* div for text */}
          <div className="text-center mt-20 text-gray-500">
            <p className="text-primary py-4 font-medium text-sm sm:text-base">
              Published on {format(new Date(data.createdAt), "dd MMM yyyy")}
            </p>

            <h1 className="text-xl   sm:text-3xl md:text-5xl font-bold  text-gray-800 mb-2">
              {data.title}
            </h1>

            <h2 className="text-lg sm:text-xl font-medium text-gray-600 mb-4">
              {data.subTitle}
            </h2>

            <span className="text-sm text-gray-600 p-4 bg-primary/10 rounded-lg ">By Karan upadhyay</span>
          </div>

          {/* div for image */}
          <div className="mx-10 max-w-4xl md:mx-auto my-10 mt-6">
            <img src={data.image} alt="" className="rounded-3xl mb-5 " />
            <div
              className="rich-text max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
            {/* comments section */}
            <div className="mt-14 mb-10  max-w-3xl mx-auto">
              <p className="font-semibold text-xl">
                Comments ({comments.length})
              </p>
              <div className="flex flex-col gap-4 ">
                {comments.map((item) => (
                  <div className="bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-500 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={assets.user_icon} alt="" className="w-6" />
                      <p className="font-medium">{item.name}</p>
                    </div>

                    <p className="text-sm max-w-md ml-8">{item.content}</p>
                    <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                      {format(new Date(item.createdAt), "dd MMM yyyy")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* add comment section */}
            <div className="max-w-3xl mx-auto">
              <p className="font-semibold mb-4">Add your comment</p>
              <form
                action=""
                onSubmit={addComment}
                className="flex flex-col items-start gap-4 max-w-lg"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />

                <textarea
                  placeholder="Comment"
                  className="w-full p-2 border border-gray-300 rounded outline-none h-48"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <button
                  type="submit"
                  className="cursor-pointer rounded-md p-2 text-white bg-primary"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* share buttons */}
            <div className="my-12 max-w-2xl mx-auto">
              <p className="font-semibold text-2xl my-4">Share this article on social media</p>
              <div className="flex">
                <img src={assets.facebook_icon} width={50}/>
                <img src={assets.twitter_icon} width={50}/>
                <img src={assets.googleplus_icon} width={50}/>
              </div>
            </div>
          </div>

          <Footer/>

          <div></div>
        </div>
      ) : (
        <PageLoader/>
      )}
    </div>
  );
};

export default Blog;
