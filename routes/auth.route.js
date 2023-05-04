import { Router } from "express";
import authControl from "../controllers/auth.control.js";
import { JWTverity } from "../middlewares/JWTaccess.js";

// init router
const router = Router();
// REGISTER
router.post("/register", authControl.register);
// LOGIN
router.post("/login", authControl.login);
// Auto
router.get("/autoLogin", JWTverity, authControl.autoLogin);
export default router;
