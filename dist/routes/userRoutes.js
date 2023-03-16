"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userSchema_1 = require("../validationSchemas/userSchema");
const validate_1 = __importDefault(require("../middleware/validate"));
const verifyJwt_1 = __importDefault(require("../middleware/verifyJwt"));
const userRouter = express_1.default.Router();
userRouter.get("/", verifyJwt_1.default, userController_1.getUser);
userRouter.post("/signup", (0, validate_1.default)(userSchema_1.signupUserSchema), userController_1.signupUser);
userRouter.post("/login", (0, validate_1.default)(userSchema_1.loginUserSchema), userController_1.loginUser);
userRouter.post("/verify-mail/:verifyToken", userController_1.verifyEmail);
userRouter.post("/resend-verify-mail", userController_1.resendVerifyMail);
userRouter.post("/forget-password", userController_1.forgetPasswordSendMail);
userRouter.post("/verify-forget-password/:verifyToken", userController_1.verifyForgetPassword);
exports.default = userRouter;
