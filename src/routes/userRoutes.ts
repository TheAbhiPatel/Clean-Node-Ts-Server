import express from "express";
import {
  forgetPasswordSendMail,
  getUser,
  loginUser,
  resendVerifyMail,
  signupUser,
  verifyEmail,
  verifyForgetPassword,
} from "../controllers/userController";
import {
  loginUserSchema,
  signupUserSchema,
} from "../validationSchemas/userSchema";
import validate from "../middleware/validate";
import verifyJwt from "../middleware/verifyJwt";

const userRouter = express.Router();

userRouter.get("/", verifyJwt, getUser);
userRouter.post("/signup", validate(signupUserSchema), signupUser);
userRouter.post("/login", validate(loginUserSchema), loginUser);
userRouter.post("/verify-mail/:verifyToken", verifyEmail);
userRouter.post("/resend-verify-mail", resendVerifyMail);
userRouter.post("/forget-password", forgetPasswordSendMail);
userRouter.post("/verify-forget-password/:verifyToken", verifyForgetPassword);

export default userRouter;
