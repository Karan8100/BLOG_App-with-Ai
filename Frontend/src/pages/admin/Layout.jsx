import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router'
import { Link } from 'react-router'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  

  const {axios,setToken,navigate} = useAppContext();
  
  const logout = ()=>{
    localStorage.removeItem("token");
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/')
  }

  return (
    <>
      <div className="flex justify-between items-center h-16  p-4  border-b-2 border-gray">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="size-6 sm:size-9" />
          <span className="text-3xl font-bold font-mono ">Blogify</span>
        </Link>

        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* side bar */}
      <div className='flex h-[calc(100vh-64px)] bg-slate-300'>
        <Sidebar/>
        <Outlet/>
      </div>
    </>
  );
}

export default Layout
