import express from "express";
import config from "config";
import authRouter from "./auth/index.js";
import userRouter from "./user/index.js";
import adminRouter from "./admin/index.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();
const adminUrl = config.get("ADMIN_URL");

router.use("/auth", authRouter);
router.use("/user", isLoggedIn, userRouter);
router.use(`/${adminUrl}`, isLoggedIn, isAdmin, adminRouter);

export default router;
