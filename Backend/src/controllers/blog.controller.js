import imagekit from "../config/imagekit.js";
import fs from "fs";
import blog from "../models/blog.js";
import Comment from "../models/comments.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } =
      JSON.parse(req.body.blog);
      const imageFile = req.file;
      
    //imageFile
    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    fs.unlinkSync(imageFile.path); // Clean up the uploaded file after reading it
    //upload image to image kit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    //optimiseation of image
    const opt_url = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //auto compression
        { format: "webp" }, //convert to webp format
        { width: "1000" }, //resize to 1280px width
      ],
    });

    const imageUrl = opt_url;

    await blog.create({
      title,
      subTitle,
      description,
      category,
      image: imageUrl,
      isPublished,
    });

    res.status(201).json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error("Error adding blog:", error);
    // Clean up the uploaded file if it exists
    res.status(400).json({ success: false, message: "Failed to add blog" });
  } 
};

export const getAllBlogs = async (req, res) => {
  try {
    //we will get only published blogs
    const blogs = await blog
      .find({ isPublished: true })
      .sort({ createdAt: -1 });
    res.status(201).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(400).json({ success: false, message: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog_found = await blog.findById(id);
    if (!blog_found) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog: blog_found });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.json({ success: false, message: "Failed to fetch blog" });
  }
};

export const deleteBlogById = async (req, res) => {
  const { id } = req.body;
  try {
    const blogToDelete = await blog.findByIdAndDelete(id);
    if (!blogToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    //delete all comments related to this blog
    await Comment.deleteMany({ blog: id });
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.json({ success: false, message: "Failed to delete blog" });
  }
};

export const toggleBlogPublishStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const blogToUpdate = await blog.findById(id);
    if (!blogToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    // Toggle the publish status
    blogToUpdate.isPublished = !blogToUpdate.isPublished;
    await blogToUpdate.save();

    return res.json({
      success: true,
      message: "Blog publish status toggled successfully",
    });
  } catch (error) {
    console.error("Error toggling blog publish status:", error);
    res.json({ success: false, message: "Failed to toggle publish status" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({
      blog,
      name,
      content,
    });
    return res.json({
      success: true,
      message: "Comment added for review",
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to add comment" });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching blog comments:", error);
    res.json({ success: false, message: "Failed to fetch blog comments" });
  }
};
 
export const generateContent = async (req,res)=>{
  try{
    const {prompt} = req.body;
    const content = await main(prompt + 'generate a blog post on this specified topic  without any grammer mistake  and in professional tone like written by human limit to 200 to 500 words in marked down and nicely formatted way');
     res.json({success:true,content});
    
  }catch(error){
    res.json({ success: false,message : error.message });
  }
}
