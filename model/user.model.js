import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      name: {
         type: String,
         default: "",
      },
      password: {
         type: String,
         required: true,
         min: 6,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         max: 50,
      },
      profileImg: {
         type: String,
         default: "",
      },
      followers: {
         type: Array,
         default: [],
      },
      followings: {
         type: Array,
         default: [],
      },
      admin: {
         type: Boolean,
         default: false,
      },
      desc: {
         type: String,
         default: "",
         max: 50,
      },
   },
   { timestamps: true }
);
const user = mongoose.model("User", userSchema);
export default user;
