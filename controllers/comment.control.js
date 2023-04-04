import cmtModel from "../model/comment.model.js";

const commentControl = {
   getComment: async (req, res) => {
      try {
         const cmtId = req.params.id;
         const cmt = await cmtModel.findById(cmt);
         res.status(200).json(cmt);
      } catch (err) {
         res.status(500).json({ Error: err });
      }
   },
   createComment: async (req, res) => {
      try {
         const newCmt = new cmtModel(req.body);
         const cmt = await newCmt.save();
         res.status(200).json(cmt);
      } catch (err) {
         res.status(500).json({ Error: err });
      }
   },
   updateComment: async (req, res) => {
      try {
         const cmtId = req.params.id;
         const cmt = await cmtModel.findById(cmtId);
         if (cmt.userId == req.body.userId) {
            await cmt.updateOne({ $set: req.body });
            res.status(200).json("Update Coment Successfully!");
         } else {
            res.status(403).json("You can't perform this action!!");
         }
      } catch (err) {
         res.status(500).json({ Error: err });
      }
   },
   deleteComment: async (req, res) => {
      try {
         const cmtId = req.params.id;
         const cmt = await cmtModel.findById(cmtId);
         if (cmt.userId == req.body.userId) {
            await cmt.deleteOne();
            res.status("Delete Comment Successfully !!!");
         } else {
            res.status(403).json("You can't perform this action !!!");
         }
      } catch (err) {
         res.status(500).json({ Error: err });
      }
   },
};

export default commentControl;
