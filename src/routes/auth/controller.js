import controller from "../controller.js";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";

const saltRounds = parseInt(config.get("SALT_ROUNDS"));
const jwtSecretKey = config.get("JWT_SECRET_KEY");

export default new (class extends controller {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await this.User.create({ email, password: hashedPassword });
            this.response({ res, status: 201, message: "user created", data: user.show() });
        } catch (error) {
            this.response({ res, status: 400, message: "user not created", data: error.message });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await this.User.findOne({ email });
        if (!user) {
            return this.response({ res, status: 400, message: "user not found" });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return this.response({ res, status: 400, message: "user not found" });
        }
        const token = jwt.sign({ _id: user.id }, jwtSecretKey);
        this.response({ res, message: "successfully logged in", data: { token } });
    }
})();
