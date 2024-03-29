import { Router } from "express";
import userControl from "../controllers/user.control.js";
import uploadCloud from "../middlewares/cloudinary.js";
const router = Router();

// Get user
router.get("/", userControl.getUser);
// Get All user
router.get("/:id", userControl.getAllUser);
// Get Followers
router.get("/followings/:id", userControl.getFollowings);
// Update user
router.put(
   "/update/:id",
   uploadCloud.single("image", (req, res, next) => {
      if (!req.file) {
         console.log(req.file);
         next(console.log("No Image"));
      }
      next();
   }),
   userControl.updateUser
);
// Delete User
router.delete("/:id", userControl.deleteUser);
// Follower User
router.put("/:id/follow", userControl.followUser);
// Unfollower User
router.put("/:id/unfollow", userControl.unFollowUser);

export default router;
