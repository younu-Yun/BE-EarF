import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

interface CustomRequest extends Request {
  id?: string;
}

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "인증되지 않은 요청입니다." });
  }

  try {
    const payload = verifyAccessToken(token);
    req.id = payload._id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }
};
