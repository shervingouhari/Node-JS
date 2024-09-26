import express from "express";
import Validator from "./validator.js";
import controller from "./controller.js";

const router = express.Router();
router.post("/register", Validator.register(), controller.validate, controller.register);
router.post("/login", Validator.login(), controller.validate, controller.login);

export default router;
