import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router'
import { Link,NavLink } from 'react-router'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'
import {Menu} from "lucide-react"
import { useState } from 'react'

const Layout = () => {

  

  const {axios,setToken,navigate} = useAppContext();
  
  const logout = ()=>{
    localStorage.removeItem("token");
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/')
  }

  const links = [
        { to: "/admin", label: "Dashboard", icon: assets.home_icon },
        { to: "/admin/addBlog", label: "Add Blog", icon : assets.add_icon },
        { to: "/admin/listBlog", label: "List Blogs" , icon:assets.list_icon},
        { to: "/admin/comments", label: "Comments" ,icon : assets.comment_icon},
      ];

  const [menuOpen,setMenuOpen] = useState(false);    

  return (
    <>
      <div className="flex justify-between items-center h-10 md:h-16  p-4  border-b-2 border-gray">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="size-6 sm:size-9" />
          <span className="text-3xl font-bold font-mono ">Blogify</span>
        </Link>

        <button
          onClick={logout}
          className="text-sm sm:text-md px-4 py-1 sm:px-8 sm:py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
        {/* hamburger menu on smaller screen */}
        <div className="md:hidden">
          <Menu
            className="size-6 text-white bg-primary cursor-pointer"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        </div>

        {menuOpen && (
          <div className="absolute top-10 bg-white w-[95%] z-10 md:hidden shadow-md px-4">
            <nav className="flex flex-col gap-3 py-2">
              {links.map((link) => (
                <NavLink
                  to={link.to}
                  key={link.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 mx-4 rounded-md font-medium transition-all 
             ${
               isActive
                 ? "bg-blue-500 text-white"
                 : "text-gray-700 hover:bg-gray-100"
             }`
                  }
                >
                  <img src={link.icon} className="size-3" alt="" />
                  <p>{link.label}</p>
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* side bar */}
      <div className="flex h-[calc(100vh-64px)] bg-slate-300">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Layout
