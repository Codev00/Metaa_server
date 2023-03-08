import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";

const userControl = {
   // Lay thong tin user
   getUser: async (req, res) => {
      try {
         const userId = req.query.userId;
         const username = req.query.username;
         const user = userId
            ? await userModel.findById(userId)
            : await userModel.findOne({ username: username });
         const { password, __v, ...rest } = user._doc;
         res.status(200).json(rest);
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   // Cap nhat user
   updateUser: async (req, res) => {
      if (req.body.userId === req.params.id || req.body.admin) {
         if (req.body.password) {
            try {
               const salt = await bcrypt.genSalt(10);
               req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
               res.status(500).json({ err: error.message });
            }
         }
         try {
            const id = req.params.id;
            const user = await userModel.findByIdAndUpdate(id, {
               $set: req.body,
            });
            res.status(200).json("Cap nhat thong tin thanh cong ~");
         } catch (error) {
            res.status(500).json({ err: error.message });
         }
      } else {
         res.status(403).json("Ban khong the cap nhat thong tin!");
      }
   },
   // Xoa user
   deleteUser: async (req, res) => {
      if (req.body.userId === req.params.id || req.body.admin) {
         try {
            const id = req.params.id;
            const user = await userModel.findByIdAndDelete(id);
            res.status(200).json("Xoa nguoi dung thanh cong!");
         } catch (error) {
            res.status(500).json({ err: error.message });
         }
      } else {
         res.status(403).json("Ban khong the xoa nguoi dung!");
      }
   },
   // follow
   followUser: async (req, res) => {
      const id = req.params.id;
      if (req.body.userId !== id) {
         try {
            // Your user
            const user = await userModel.findById(id);
            // My user
            const myUser = await userModel.findById(req.body.userId);
            // Kiem tra xem da follow nguoi do hay chua
            if (!user.followers.includes(req.body.userId)) {
               await user.updateOne({ $push: { followers: req.body.userId } });
               await myUser.updateOne({ $push: { followings: id } });
               res.status(200).json("Theo doi thanh cong!");
            } else {
               res.status(403).json("Bạn đã theo dõi người dùng này!");
            }
         } catch (error) {
            res.status(500).json({ err: error.message });
         }
      } else {
         res.status(403).json("Bạn không thể theo dõi chính mình!");
      }
   },
   // unfollow
   unFollowUser: async (req, res) => {
      const id = req.params.id;
      if (req.body.userId !== id) {
         try {
            const user = await userModel.findById(id);
            const myUser = await userModel.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
               await user.updateOne({ $pull: { followers: req.body.userId } });
               await myUser.updateOne({ $pull: { followings: id } });
               res.status(200).json("Bo theo doi thanh cong!");
            } else {
               res.status(403).json("Ban chua theo doi nguoi dung nay");
            }
         } catch (error) {
            res.status(500).json({ err: error.message });
         }
      } else {
         res.status(403).json("Ban khong the bo theo doi chinh minh??");
      }
   },
};

export default userControl;
