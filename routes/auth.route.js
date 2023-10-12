import express from "express";
const router = express.Router();

import {
  loadSchool,
  login,
  logout,
  register,
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/jwt.js";

router.post("/register", register);
router.post("/login", login);
router.get("/load", verifyToken, loadSchool);
router.post("/logout", logout);

export default router;
