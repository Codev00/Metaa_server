import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
         max: 500,
      },
      img: {
         type: String,
      },
      likes: {
         type: Array,
         default: [],
      },
   },
   { timestamps: true }
);
const model = mongoose.model("Post", postSchema);
export default model;
