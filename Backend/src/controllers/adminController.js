import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import blog from '../models/blog.js'
import comment from '../models/comments.js'

dotenv.config(); 

export const adminLogin = async (req, res) => {
    try{
      const { email, password } = req.body;
      if(!email || !password) {
        return res.status(400).json({ success:false, message: "Email and password are required" });
      }
      
      if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ success:false,message: "Invalid email or password" });
      }

      const token = jwt.sign({email},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "7d"
      });

      res.json({success:true, token});

    }catch(error){
        console.error("Error in adminLogin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getAllBlogsAdmin = async (req, res) => {
  try{
    //we need all blogs for admin
    //so we will fetch all blogs from the database
    const blogs = await blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    console.error("Error in getAllBlogsAdmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getAllComments = async (req, res) => {
  try {
    const comments = await comment.find({}).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Failed to fetch comments" });
  }
}

export const getDashboard = async (req,res)=>{
  try{
    const recentBlogs = await blog.find({}).sort({createdAt: -1}).limit(5);
    const blogs = await blog.countDocuments();
    const comments = await comment.countDocuments();
    const drafts= await blog.countDocuments({isPublished:false})

    const dashBoardData = {
      recentBlogs,
      blogs,
      comments,
      drafts
    }
    res.json({ success: true, dashBoardData });
  }catch(error){
    console.error("Error in getDashboard:", error);
    res.status(500).json({ message: "Internal server error" });

  }
} 

//delete comment
export const deleteCommentById = async (req, res) => { 
  try{
  const { id } = req.body;
  await comment.findByIdAndDelete(id);
  
  res.json({ success: true, message: "Comment deleted successfully" });
  }catch(error){
    console.error("error deleting comment",error);
    res.status(500).json({ success: false, message: "Failed to delete comment" });
  }
}

//aprove comment by id
export const approveCommentById = async (req,res)=>{
  try{
     const {id} = req.body;
     const commentToUpdate = await comment.findById(id);
     if(!commentToUpdate){
        return res.status(404).json({ success: false, message: "Comment not found" });
     }
     commentToUpdate.isApproved = true;
     await commentToUpdate.save();

     res.json({ success: true, message: "Comment approved successfully" });

     //or we can do await comment.findbyidandupdate(id,{isApproved:true});
  }catch(error){ 
    console.error("error approving comment", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to approve comment" });

  }
}

