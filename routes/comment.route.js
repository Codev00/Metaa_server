import { Router } from "express";
import commentControl from "../controllers/comment.control.js";

const router = Router();

router.post("/", commentControl.createComment);

router.get("/:id", commentControl.getComment);

router.get("/all/:id", commentControl.getCommentPost);

router.put("/edit/:id", commentControl.updateComment);

router.delete("/delete/:id", commentControl.deleteComment);

export default router;
