import express from "express";
import { getUser, loginUser, signupUser } from "../controllers/userController";
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

export default userRouter;
