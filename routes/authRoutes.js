import express from "express";
import { adminLogin, googleLogin, login, logout, registration } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration", registration); // for signup
authRoutes.post("/login", login);               // for login
authRoutes.get("/logout", logout);              // for logout
authRoutes.post("/googlelogin", googleLogin);   // for GoogleLogin
authRoutes.post("/adminLogin", adminLogin);   // for ADMINLogin

export default authRoutes;
