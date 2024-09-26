import express from "express";
import controller from "./controller.js";

const router = express.Router();
router.get("/dashboard", controller.dashboard);
router.get("/me", controller.me);

export default router;
