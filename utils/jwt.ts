import jwt from "jsonwebtoken";
import { User } from "../models";

const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
const accessTokenExpiration = "1h";
const refreshTokenExpiration = "7d";

export const generateAccessToken = (_id: string): string => {
  const token = jwt.sign({ _id }, jwtSecret, {
    expiresIn: accessTokenExpiration,
  });
  return token;
};

export const generateRefreshToken = (_id: string): string => {
  const token = jwt.sign({ _id }, jwtSecret, {
    expiresIn: refreshTokenExpiration,
  });
  return token;
};

export const verifyAccessToken = (token: string): any => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};

export const verifyRefreshToken = (token: string): any => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};

export const deleteRefreshToken = async (_id: string): Promise<void> => {
  try {
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    user.refreshToken = "";
    await user.save();
  } catch (error) {
    throw new Error("리프레시 토큰을 삭제할 수 없습니다.");
  }
};
