import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRouter from "./routes/admin.route.js";
import blogRouter from "./routes/blog.route.js";
dotenv.config();
import path from "path";
const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use('/api/auth',adminRouter);
app.use('/api/blog',blogRouter);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
   connectDB();
})