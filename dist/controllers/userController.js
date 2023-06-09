"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFunc = exports.verifyForgetPassword = exports.forgetPasswordSendMail = exports.resendVerifyMail = exports.verifyEmail = exports.loginUser = exports.signupUser = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const sendMail_1 = require("../utils/sendMail");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: "something went wrong !!!" });
    }
});
exports.getUser = getUser;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const body = req.body;
    const { name, email, password } = req.body;
    try {
        if (!name && !email && !password)
            return res
                .status(401)
                .json({ success: false, message: "all fields required" });
        const user = yield userModel_1.default.findOne({ email });
        if (user)
            return res
                .status(406)
                .json({ success: false, message: "user alredy exists" });
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const verifyToken = yield jsonwebtoken_1.default.sign({ email: email }, config_1.JWT_SECRET, {
            expiresIn: "5m",
        });
        yield userModel_1.default.create({
            name,
            email,
            password: hashPassword,
        });
        const PreviewUrl = yield (0, sendMail_1.sendVerificationMail)(name, email, verifyToken, true);
        res.status(201).json({
            success: true,
            message: "user registered, Please verifi user Email !",
            PreviewUrl,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "user not register !!!" });
    }
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "user not found !!!" });
        if (user.isVerified === false)
            return res.status(401).json({
                success: false,
                message: "Please verify your email first !!!",
            });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res
                .status(401)
                .json({ success: false, message: "invalid password !!!" });
        const userData = { name: user.name, email: user.email, id: user.id };
        const token = yield jsonwebtoken_1.default.sign(userData, config_1.JWT_SECRET, {
            expiresIn: "5m",
        });
        res.status(200).json({ success: true, message: "user logged in", token });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "user not register !!!" });
    }
});
exports.loginUser = loginUser;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verifyToken } = req.params;
    try {
        const decoded = jsonwebtoken_1.default.verify(verifyToken, config_1.JWT_SECRET);
        if (!decoded)
            return res
                .status(400)
                .json({ success: false, message: "Expired verification token" });
        const user = yield userModel_1.default.findOne({ email: decoded.email });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        yield user.updateOne({ $set: { isVerified: true } });
        res.status(201).json({ success: true, message: "user verified" });
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: "invalid verification token !!!" });
    }
});
exports.verifyEmail = verifyEmail;
const resendVerifyMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "user not found !!!" });
        if (user.isVerified == true)
            return res
                .status(400)
                .json({ success: false, message: "user already Verified !!!" });
        const verifyToken = yield jsonwebtoken_1.default.sign({ email: email }, config_1.JWT_SECRET, {
            expiresIn: "5m",
        });
        const PreviewUrl = yield (0, sendMail_1.sendVerificationMail)(user.name, email, verifyToken, true);
        res.status(200).json({
            success: true,
            message: "verification email sent !",
            PreviewUrl,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "user not register !!!" });
    }
});
exports.resendVerifyMail = resendVerifyMail;
const forgetPasswordSendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "user not found !!!" });
        if (user.isVerified === false)
            return res.status(401).json({
                success: false,
                message: "Please verify your email first !!!",
            });
        const verifyToken = yield jsonwebtoken_1.default.sign({ email: email }, config_1.JWT_SECRET, {
            expiresIn: "5m",
        });
        const PreviewUrl = yield (0, sendMail_1.sendVerificationMail)(user.name, email, verifyToken, false);
        res.status(200).json({
            success: true,
            message: "Please check your Email !",
            PreviewUrl,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "user not register !!!" });
    }
});
exports.forgetPasswordSendMail = forgetPasswordSendMail;
const verifyForgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { verifyToken } = req.params;
    const { password } = req.body;
    try {
        const decoded = yield jsonwebtoken_1.default.verify(verifyToken, config_1.JWT_SECRET);
        if (!decoded)
            return res.status(401).json({
                success: false,
                message: "verification token is not valid!!!",
            });
        const user = yield userModel_1.default.findOne({ email: decoded.email });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "user not found !!",
            });
        const hashPass = yield bcrypt_1.default.hash(password, 10);
        yield user.updateOne({ $set: { password: hashPass } });
        res
            .status(201)
            .json({ success: true, message: "Password Change Successfully" });
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: "verification token is not valid!!!" });
    }
});
exports.verifyForgetPassword = verifyForgetPassword;
// =====================================
const newFunc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "user not register !!!" });
    }
});
exports.newFunc = newFunc;
