import postModel from "../model/post.model.js";
import userModel from "../model/user.model.js";

const postControl = {
   // Create Post
   createPost: async (req, res) => {
      try {
         const file = req.file;
         const newPost = new postModel({ ...req.body, img: file.path });
         const post = await newPost.save();
         res.status(200).json(post);
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   // Update post
   updatePost: async (req, res) => {
      try {
         const id = req.params.id;
         const post = await postModel.findById(id);
         if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Cap nhap post thanh cong!");
         } else {
            res.status(403).json("Ban khong the thuc hien hanh dong nay!");
         }
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   // Delete post
   deletePost: async (req, res) => {
      try {
         const id = req.params.id;
         const post = await postModel.findById(id);
         if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Ban da xoa thanh cong!");
         } else {
            res.status(403).json("Ban khong the thuc hien hanh dong nay!");
         }
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   // Like post
   likePost: async (req, res) => {
      try {
         const id = req.params.id;
         const post = await postModel.findById(id);
         if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Like!");
         } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Unlike!");
         }
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   // Get post
   getPost: async (req, res) => {
      try {
         const id = req.params.id;
         const post = await postModel.findById(id);
         res.status(200).json(post);
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   // News Feed
   newsFeed: async (req, res) => {
      try {
         const curUser = await userModel.findById(req.params.userId);
         const userPosts = await postModel.find({ userId: curUser._id });
         const friendPosts = await Promise.all(
            curUser.followings.map((friendId) => {
               return postModel.find({ userId: friendId });
            })
         );
         res.status(200).json(userPosts.concat(...friendPosts));
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   // User Feed
   userFeed: async (req, res) => {
      try {
         const user = await userModel.findOne({
            username: req.query.username,
         });
         const posts = await postModel.find({ userId: user._id });
         res.status(200).json(posts);
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
};

export default postControl;
