import { JWTsign } from "../middlewares/JWTaccess.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
const authControl = {
   // Register
   register: async (req, res) => {
      try {
         const salt = await bcrypt.genSalt(10);
         const hashed = await bcrypt.hash(req.body.password, salt);
         // Create new user
         const newUser = await new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hashed,
         });
         // Save user in db
         const user = await newUser.save();
         res.status(200).json(user);
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   // Login
   login: async (req, res) => {
      try {
         // Tìm user
         const user = await userModel.findOne({ email: req.body.email });
         if (!user) {
            return res.status(404).json("Nguoi dung khong ton tai!");
         }
         // So sánh pass
         const validPass = await bcrypt.compare(
            req.body.password,
            user.password
         );
         if (!validPass) {
            return res.status(400).json("Sai mat khau!");
         }
         const { password, ...userData } = user._doc;
         // Create token
         const token = JWTsign(userData, process.env.JWT_SECRET, "30d");
         res.cookie("token", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
         });

         res.status(200).json(userData);
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
   autoLogin: async (req, res) => {
      try {
         res.status(200).json(req.user);
      } catch (error) {
         res.status(500).json({ err: error.message });
      }
   },
};

export default authControl;
