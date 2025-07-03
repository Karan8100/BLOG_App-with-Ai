

import { Routes, Route } from 'react-router'
import { Toaster } from "react-hot-toast";

import "./index.css"
import React from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import DashBoard from './pages/admin/DashBoard'
import Comments from './pages/admin/Comments'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Login from './components/admin/Login';
//why this is used?
import 'quill/dist/quill.snow.css';
import { useAppContext } from './context/AppContext';

const App = () => {
  const {token}  = useAppContext();
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ?<Layout /> : <Login/>}>
          <Route index element={<DashBoard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments"  element={<Comments />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App

