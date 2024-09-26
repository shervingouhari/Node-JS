import autoBind from "auto-bind";
import { validationResult } from "express-validator";
import User from "../models/user.js";

export default class {
    constructor() {
        autoBind(this);
        this.User = User;
    }
    validate(req, res, next) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return this.response({
                res,
                status: 400,
                message: "validation error",
                data: result.array(),
            });
        } else {
            next();
        }
    }
    response({ res, status = 200, message = null, data = null }) {
        res.status(status).json({
            message,
            data,
        });
    }
}
