import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models";

const jwtSecret: Secret = process.env.JWT_SECRET || "default_secret_key";
const accessTokenExpiration = "1h";
const refreshTokenExpiration = "7d";

export const generateAccessToken = (id: string): string => {
  const token = jwt.sign({ _id: id }, jwtSecret, {
    expiresIn: accessTokenExpiration,
  });
  return token;
};

export const generateRefreshToken = (id: string): string => {
  const token = jwt.sign({ _id: id }, jwtSecret, {
    expiresIn: refreshTokenExpiration,
  });
  return token;
};

export const verifyAccessToken = (token: string): any => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    throw new Error("유효하지 않은 액세스 토큰입니다.");
  }
};

export const verifyRefreshToken = (token: string): any => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    throw new Error("유효하지 않은 리프레시 토큰입니다.");
  }
};

export const deleteRefreshToken = async (id: string): Promise<void> => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    user.refreshToken = "";
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error("리프레시 토큰을 삭제할 수 없습니다.");
  }
};
