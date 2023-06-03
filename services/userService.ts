import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";
import { User, IUser } from "../models";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export default class UserService {
  // 유저 회원가입
  public registerUser = async (
    id: string,
    password: string,
    name: string,
    email: string,
    phoneNumber: string
  ): Promise<IUser> => {
    try {
      const hashedPassword = await hashPassword(password);

      const user: IUser = new User({
        id,
        password: hashedPassword,
        name,
        email,
        phoneNumber,
      });

      return await user.save();
    } catch (error) {
      throw new Error(
        "필수 기재 정보가 입력되지 않았습니다. 빠진 부분을 입력 후 진행해주세요!"
      );
    }
  };

  // 유저 로그인
  public loginUser = async (
    id: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const user: IUser | null = await User.findOne({ id }).select("+password");

    if (!user || !user.password) {
      throw new Error(
        "등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다."
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error(
        "등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다."
      );
    }

    try {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      user.refreshToken = refreshToken;
      await user.save();
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(
        "일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시 이용해 주세요."
      );
    }
  };

  // 리프레시 토큰 갱신
  public refreshTokens = async (
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const userId = decoded._id;

      const accessToken = generateAccessToken(userId);
      const newRefreshToken = generateRefreshToken(userId);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error(
        "리프레시 토큰을 갱신할 수 없습니다. 다시 로그인해주세요."
      );
    }
  };

  // ID로 유저 가져오기
  public static getUserById = async (id: string): Promise<IUser | null> => {
    return User.findById(id);
  };

  // 모든 유저 가져오기
  public static getAllUsers = async (): Promise<IUser[]> => {
    return User.find();
  };

  // ID로 유저 업데이트하기
  public static updateUserById = async (
    id: string,
    updatedData: Partial<IUser>
  ): Promise<IUser | null> => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: updatedData.name,
        email: updatedData.email,
        phoneNumber: updatedData.phoneNumber,
        profileImage: updatedData.profileImage,
      },
      { new: true }
    );

    return updatedUser;
  };
}
