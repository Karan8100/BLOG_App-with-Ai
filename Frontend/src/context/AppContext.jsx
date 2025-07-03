import { createContext ,useContext, useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router"
//we dont have to make calls to the backend with the full url
 axios.defaults.baseURL = import.meta.env.MODE === "development" ? import.meta.env.VITE_BASE_URL : "/api";
//this will set the base url to the backend api in development mode and to the api in production mode
 const AppContext = createContext({})


export const AppProvider = ({children})=>{
    const navigate = useNavigate()
    //we can add any global state or functions here

    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input,setInput] = useState("")

    //now we will fetch our data from the backend
    const fetchblogs = async () =>{
        try{
         const {data}  = await axios.get('/blog/All');
         data.success ? setBlogs(data.blogs) : toast.error(data.message)

        }catch(err){
            toast.error("Failed to fetch blogs")
        }
    }

    useEffect(()=>{
        fetchblogs();
        const token = localStorage.getItem("token");
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    },[])
    const value = {
        axios,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
        navigate,
        fetchblogs
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};
//now consume the context by making a custom hook
export const useAppContext = () => {
    return useContext(AppContext);
   
  
};
