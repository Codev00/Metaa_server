import postControl from "../controllers/post.control.js";
import { Router } from "express";

const router = Router();

// Create post
router.post("/", postControl.createPost);
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
