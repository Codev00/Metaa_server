import mongoose from "mongoose";

const cmtSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      reply: {
         type: String,
         default: "",
      },
      postId: {
         type: String,
         required: true,
      },
      node: {
         type: Number,
         default: 0,
      },
      cmt: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const model = mongoose.model("cmt", cmtSchema);
export default model;
