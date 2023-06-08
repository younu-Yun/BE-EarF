import { Secret, SignOptions, sign } from "jsonwebtoken";
import { User, IUser } from "../models/index";
import dotenv from "dotenv";
dotenv.config();

export const setUserToken = async (
  user: IUser,
  isOnlyAccess: boolean
): Promise<{ accessToken: string; refreshToken?: string }> => {
  const accessPayload = {
    _id: user._id,
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const accessOptions = { algorithm: "HS256", expiresIn: "1h" };
  const accessToken = sign(
    accessPayload,
    process.env.JWTACCESS as Secret,
    accessOptions as SignOptions
  );

  if (!isOnlyAccess) {
    const refreshPayload = {
      id: user.id,
    };
    const refreshOptions = { algorithm: "HS256", expiresIn: "7d" };
    const refreshToken = sign(
      refreshPayload,
      process.env.JWTREFRESH as Secret,
      refreshOptions as SignOptions
    );

    await User.updateOne(
      { id: refreshPayload.id },
      {
        refreshToken: refreshToken,
      }
    );

    return { accessToken, refreshToken };
  } else {
    console.log("혹시 여기까지 오니?");
    return { accessToken };
  }
};
