import express from "express";

import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  toggleBlogPublishStatus,
  addComment,
  getBlogComments,
  generateContent,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

 
const router = express.Router();
router.post("/add",auth,upload.single('image'),addBlog);
router.get("/All",getAllBlogs);
router.get("/:id",getBlogById);
router.delete("/delete",auth,deleteBlogById);
router.post("/togglePublish",auth,toggleBlogPublishStatus);

router.post("/addComment",addComment);
router.get("/comments/:id",getBlogComments);
router.post("/generateContent",auth,generateContent);

export default router;
