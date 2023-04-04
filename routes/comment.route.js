import { Router } from "express";
import commentControl from "../controllers/comment.control.js";

const router = Router();

router.get("/:id", commentControl.getComment);

router.post("/comment", commentControl.createComment);

router.put("/edit/:id", commentControl.updateComment);

router.delete("/:id", commentControl.deleteComment);

export default router;
