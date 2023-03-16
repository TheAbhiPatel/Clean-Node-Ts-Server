"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const connectDB_ts_1 = require("./connectDB.ts");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ message: "hey you are on my api" });
});
app.use((req, res, next) => {
    res.status(404).json({ error: true, message: "route not found" });
});
app.listen(config_1.PORT, config_1.HOST_NAME, () => {
    console.log(`server is running t at : http://${config_1.HOST_NAME}:${config_1.PORT}`);
    (0, connectDB_ts_1.connectDb)(config_1.MONGO_URL);
});
