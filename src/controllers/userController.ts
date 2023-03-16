import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel, { IUser } from "../models/userModel";
import { signupUserInput } from "../validationSchemas/userSchema";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { sendVerificationMail } from "../utils/sendMail";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "something went wrong !!!" });
  }
};

export const signupUser = async (
  req: Request<{}, {}, signupUserInput>,
  res: Response
) => {
  // const body = req.body;

  const { name, email, password } = req.body;

  try {
    if (!name && !email && !password)
      return res
        .status(401)
        .json({ success: false, message: "all fields required" });
    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(406)
        .json({ success: false, message: "user alredy exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const verifyToken = await jwt.sign({ email: email }, JWT_SECRET, {
      expiresIn: "5m",
    });

    await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const PreviewUrl = await sendVerificationMail(
      name,
      email,
      verifyToken,
      true
    );

    res.status(201).json({
      success: true,
      message: "user registered, Please verifi user Email !",
      PreviewUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "user not register !!!" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found !!!" });
    if (user.isVerified === false)
      return res.status(401).json({
        success: false,
        message: "Please verify your email first !!!",
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "invalid password !!!" });

    const userData = { name: user.name, email: user.email, id: user.id };

    const token = await jwt.sign(userData, JWT_SECRET, {
      expiresIn: "5m",
    });

    res.status(200).json({ success: true, message: "user logged in", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "user not register !!!" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { verifyToken } = req.params;

  try {
    const decoded = jwt.verify(verifyToken, JWT_SECRET);

    if (!decoded)
      return res
        .status(400)
        .json({ success: false, message: "Expired verification token" });

    const user = await userModel.findOne({ email: decoded.email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    await user.updateOne({ $set: { isVerified: true } });

    res.status(201).json({ success: true, message: "user verified" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "invalid verification token !!!" });
  }
};

export const resendVerifyMail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found !!!" });
    if (user.isVerified == true)
      return res
        .status(400)
        .json({ success: false, message: "user already Verified !!!" });
    const verifyToken = await jwt.sign({ email: email }, JWT_SECRET, {
      expiresIn: "5m",
    });

    const PreviewUrl = await sendVerificationMail(
      user.name,
      email,
      verifyToken,
      true
    );
    res.status(200).json({
      success: true,
      message: "verification email sent !",
      PreviewUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "user not register !!!" });
  }
};

export const forgetPasswordSendMail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found !!!" });
    if (user.isVerified === false)
      return res.status(401).json({
        success: false,
        message: "Please verify your email first !!!",
      });
    const verifyToken = await jwt.sign({ email: email }, JWT_SECRET, {
      expiresIn: "5m",
    });

    const PreviewUrl = await sendVerificationMail(
      user.name,
      email,
      verifyToken,
      false
    );
    res.status(200).json({
      success: true,
      message: "Please check your Email !",
      PreviewUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "user not register !!!" });
  }
};

export const verifyForgetPassword = async (req: Request, res: Response) => {
  const { verifyToken } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(verifyToken, JWT_SECRET);
    if (!decoded)
      return res.status(401).json({
        success: false,
        message: "verification token is not valid!!!",
      });
    const user = await userModel.findOne({ email: decoded.email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "user not found !!",
      });
    const hashPass = await bcrypt.hash(password, 10);

    await user.updateOne({ $set: { password: hashPass } });

    res
      .status(201)
      .json({ success: true, message: "Password Change Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "verification token is not valid!!!" });
  }
};

// =====================================
export const newFunc = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "user not register !!!" });
  }
};
