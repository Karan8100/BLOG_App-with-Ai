import express from 'express';
import auth from '../middlewares/auth.js';

import {
  adminLogin,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard, 
  deleteCommentById,
  approveCommentById,
} from "../controllers/adminController.js";
 
const Router = express.Router();

Router.post('/login', adminLogin);
Router.get('/blogs',auth, getAllBlogsAdmin);
Router.get('/comments',auth, getAllComments);
Router.get('/dashboard',auth, getDashboard);
Router.delete('/delete-comment',auth, deleteCommentById);
Router.put('/approve-comment',auth, approveCommentById);

export default Router;
