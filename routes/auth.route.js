import { Router } from "express";
import authControl from "../controllers/auth.control.js";

// init router
const router = Router();
// REGISTER
router.post("/register", authControl.register);
// LOGIN
router.post("/login", authControl.login);

export default router;
