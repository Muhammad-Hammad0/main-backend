import express from "express";
import { getAdmin, getCurrentUser } from "../controller/userController.js";
import { isAuth } from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/getcurrentuser", isAuth, getCurrentUser);
router.get("/getadmin", adminAuth, getAdmin);

export default router;
