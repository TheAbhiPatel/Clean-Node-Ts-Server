import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import { signupUserInput } from "../validationSchemas/userSchema";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

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
    await userModel.create({ name, email, password: hashPassword });
    res.status(201).json({ success: true, message: "user registered" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "user not register !!!" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email && !password)
      return res
        .status(422)
        .json({ success: false, message: "all fields required" });
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found !!!" });
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

// =====================================
export const newFunc = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "user not register !!!" });
  }
};
