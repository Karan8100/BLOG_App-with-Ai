import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import { useRef } from 'react';

const Header = () => {

  const {setInput,input} = useAppContext();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search submission
    setInput(inputRef.current.value.trim());
  }

  const onClearSearch = ()=>{
   setInput("");
   inputRef.current.value = "";
  }

  return (
    <div className="mx-8 sm:mx-16 relative z-0">
      {/* isme text aayega */}
      <div className="text-center mt-20 mb-8">
        <div className="flex justify-center ">
          <div
            className="flex rounded-full justify-center items-center 
        gap-4 px-5 py-2  border border-primary/40 bg-primary/10  w-full max-w-xl mb-8"
          >
            <p>With Ai feature Integrated!!</p>
            <img src={assets.star_icon} alt="star" className="size-2.5" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold leading-tight sm:leading-[4.5rem] text-gray-500">
          Your Own <span className="text-primary/100">Blogging</span> <br />
          Platform
        </h1>
        <p className="text-base sm:text-md lg:text-lg max-w-3xl m-auto text-gray-600 mt-4">
          Share your stories, ideas, and experiences with the world. Start
          writing your blogs with ease on a platform built for creators like
          you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex justify-between max-w-lg mx-auto border border-black bg-white rounded overflow-hidden mt-6"
        >
          <input
            type="text"
            placeholder="Search your blogs"
            ref={inputRef}
            className="w-full pl-4 outline-none font-medium"
            required
          />
          <button
            type="submit"
            className="bg-primary rounded text-white px-8 py-2 m-1.5 hover:scale-105 transition-all cursor-pointer "
          >
            Submit
          </button>
        </form>
      </div>
      <div className="text-center">
        {input && (
          <button
            className="border font-light text-xs py-1 px-3 rounded-sm
        shadow-custom-sm cursor-pointer"
        onClick={onClearSearch}
          >
            Clear Search
          </button>
        )}
      </div>
      {/* background gradient image aayegi */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -z-10 -top-[90px] opacity-100  transition-colors duration-75"
      />
    </div>
  );
}

export default Header
