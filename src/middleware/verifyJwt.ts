import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const verifyJwt: RequestHandler = (req, res, next) => {
  const token = req.header("authorization");

  try {
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Authorization token required !" });

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "invalid token !" });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "invalid token !" });
  }
};

export default verifyJwt;
