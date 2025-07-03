import React, { useEffect, useRef } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import { useState } from "react";
import {parse} from "marked"
import Quill from 'quill';
import toast from 'react-hot-toast';

import { useAppContext } from '../../context/AppContext';

const AddBlog = () => {
   const {axios,fetchblogs} = useAppContext();

   //now i have to send full blog data on backend
   const [isAdding,setIsAdding] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] =useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const genrateContent = async (e) =>{
    if(!title) return toast.error('please enter a title')
      try{
        setIsLoading(true);
        const { data } = await axios.post("/blog/generateContent",{prompt:title});
    if(data.success){
      quillRef.current.root.innerHTML = parse(data.content);
    }else{
      toast.error(data.message);
    }
    }catch(err){
      toast.error(err.message || "Failed to generate content");
    }finally{
      setIsLoading(false);
    }
    
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      setIsAdding(true);

      const blog = {title,subTitle,description:quillRef.current.root.innerHTML
        ,category,isPublished};
      
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image',image);

      const {data} = await axios.post('/blog/add',formData);
      if(data.success){
        toast.success(data.message);
        setImage(null);
        setTitle("");
        setSubTitle("")
        setCategory("Startup");
        quillRef.current.root.innerHTML = "";
        fetchblogs();
        
      }
        else{
           toast.error(data.message);
        }
    }catch(err){
      toast.error(err.message || "Failed to add blog");
    }finally{
      setIsPublished(false);
      setIsAdding(false);
    }
  }

  useEffect(()=>{
    //initialize quill editor once
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image']
          ]
        }
      });
    }
  },[])
  return (
    <form
      onSubmit={submitHandler}
      className="flex-1 bg-blue-50 text-gray-600 max-h-screen overflow-y-auto"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
        </label>
        <p className="mt-4 font-medium">Blog title</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <p className="mt-4 font-medium">Subtitle</p>
        <input
          type="text"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="Enter blog subtitle"
          className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-primary"
          required
        />

        <p className="mt-4 font-medium">Blog Description</p>

        <div className="max-w-lg max-h-[260px] pb-10 pt-2 relative border  border-gray-300 rounded-md">
          <div
            ref={editorRef}
            className="max-h-[210px] overflow-y-auto px-3 py-3 mb-5"
          />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
              <div className="size-10 rounded-full border-2 border-t-white border-black animate-spin" />
            </div>
          )}

          <button
            disabled={isLoading}
            onClick={genrateContent}
            className="absolute bottom-2 right-2 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md z-20"
          >
            Generate with AI
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            if (quillRef.current) {
              quillRef.current.root.innerHTML = "";
            }
          }}
          className="text-blue-500 border  border-blue-500 hover:bg-blue-100 px-3 py-1 mt-2 z-20 rounded-md"
        >
          Clear
        </button>

        <p className="mt-4 font-medium">Blog Category</p>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Select Category" disabled>
            Select Category
          </option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="mt-4 flex items-center gap-2">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition mt-4"
        >
          {isAdding ? "posting..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
}

export default AddBlog
