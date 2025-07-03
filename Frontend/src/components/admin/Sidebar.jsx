import React from 'react'
import { NavLink } from 'react-router'
import { assets } from '../../assets/assets'
const Sidebar = () => {
    const links = [
      { to: "/admin", label: "Dashboard", icon: assets.home_icon },
      { to: "/admin/addBlog", label: "Add Blog", icon : assets.add_icon },
      { to: "/admin/listBlog", label: "List Blogs" , icon:assets.list_icon},
      { to: "/admin/comments", label: "Comments" ,icon : assets.comment_icon},
    ];
  return (
    <div className="w-64 bg-white shadow-md p-6 hidden md:block h-full">
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded font-medium transition-all ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img src={link.icon} alt="" className="min-w-4 w-5" />
            <p className="hidden md:inline-block">{link.label}</p>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar
