"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const verifyJwt = (req, res, next) => {
    const token = req.header("authorization");
    try {
        if (!token)
            return res
                .status(401)
                .json({ success: false, message: "Authorization token required !" });
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (!decoded)
            return res
                .status(401)
                .json({ success: false, message: "invalid token !" });
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "invalid token !" });
    }
};
exports.default = verifyJwt;
