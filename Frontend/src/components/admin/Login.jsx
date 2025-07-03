import React from 'react'
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from 'react-hot-toast';

const Login = () => {
  const {axios, setToken} = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e)=>{
     e.preventDefault();
     try{
       const {data} = await axios.post('/auth/login',{email, password});
       if(data.success){
         setToken(data.token)
         localStorage.setItem("token", data.token);
         axios.defaults.headers.common["Authorization"] = `${data.token}`;
         toast.success("Login successful!");
       }else{
         toast.error(data.message || "Login failed. Please try again.");
       }
     }catch(err){
      const errorMessage =
        err.response?.data?.message || "Login failed due to an unknown error.";
      toast.error(errorMessage);
     }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {/* Optional Extras
        <div className="text-sm text-gray-500 text-center mt-4">
          Forgot your password?{" "}
          <a href="#" className="text-primary underline">
            Reset
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default Login
