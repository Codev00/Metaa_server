import postControl from "../controllers/post.control.js";
import { Router } from "express";
import uploadCloud from "../middlewares/cloudinary.js";
const router = Router();

// Create post
router.post(
   "/create",
   uploadCloud.single("image", (req, res, next) => {
      if (!req.file) {
         console.log(req.file);
         next(new Error("No file uploaded"));
         return;
      }
      next();
   }),
   postControl.createPost
);
// Update post
router.put("/:id", postControl.updatePost);
// Delete post
router.delete("/:id", postControl.deletePost);
// Like post
router.put("/:id/like", postControl.likePost);
// Get post
router.get("/:id", postControl.getPost);
// News Feed
router.get("/news/:userId", postControl.newsFeed);
// User Feed
router.get("/", postControl.userFeed);

export default router;
