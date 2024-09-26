import "dotenv/config";
import config from "config";
import express from "express";
import debug from "debug";
import helmet from "helmet";
import mongoose from "mongoose";
import router from "./src/routes/index.js";

const app = express();
const log = debug("app:main");
const mongodbLog = debug("app:mongodb");
const port = config.get("PORT");
const nodeEnv = config.get("NODE_ENV");
const mongodbUrl = config.get("MONGODB_URL");
const morganLogLevel = config.get("morgan-log-level");

// (async () => {
//     try {
//         await mongoose.connect(mongodbUrl);
//         mongodbLog("connected");
//     } catch (error) {
//         mongodbLog(error);
//         process.exit(1);
//     }
// })();

app.use(helmet(), express.json(), express.urlencoded({ extended: true }), express.static("public"));
if (nodeEnv === "development") {
    (async () => {
        try {
            const { default: morgan } = await import("morgan");
            app.use(morgan(morganLogLevel));
        } catch (error) {
            log(err);
        }
    })();
}
app.use("/api", router);

app.listen(port, () => {
    log(`listening on port ${port} env:${nodeEnv}`);
});
