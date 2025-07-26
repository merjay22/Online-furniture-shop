import express from "express";
import { loginUser, getUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", authMiddleware, getUser);

export default router;
