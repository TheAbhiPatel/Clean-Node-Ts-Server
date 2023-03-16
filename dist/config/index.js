"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.HOST_NAME = exports.MONGO_URL = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
// export const MONGO_URL = process.env.MONGO_URL!;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
exports.MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@typescriptstart.m22r0gj.mongodb.net/optProject`;
exports.HOST_NAME = process.env.HOST_NAME;
exports.JWT_SECRET = process.env.JWT_SECRET;
