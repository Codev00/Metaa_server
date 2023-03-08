import { Router } from "express";
import userControl from "../controllers/user.control.js";

const router = Router();

// Get user
router.get("/", userControl.getUser);
// Update user
router.put("/:id", userControl.updateUser);
// Delete User
router.delete("/:id", userControl.deleteUser);
// Follower User
router.put("/:id/follow", userControl.followUser);
// Unfollower User
router.put("/:id/unfollow", userControl.unFollowUser);

export default router;
