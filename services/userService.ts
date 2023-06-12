import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";
import { User, IUser } from "../models";
import { setUserToken } from "../utils/jwt";

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
  ): Promise<{ accessToken: string; refreshToken?: string }> => {
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
      const { accessToken, refreshToken } = await setUserToken(user, false); // setUserToken 함수 호출 시 await 키워드 추가
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(
        "일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시 이용해 주세요."
      );
    }
  };

  // ID로 유저 가져오기
  public getUserById = async (_id: string): Promise<IUser | null> => {
    return User.findById(_id);
  };

  // Email로 유저 가져오기
  public getUserByEmail = async (email: string): Promise<IUser | null> => {
    return User.findOne({ email });
  };

  // 모든 유저 가져오기
  public getAllUsers = async (): Promise<IUser[]> => {
    return User.find();
  };

  // ID로 유저 업데이트하기
  public updateUserById = async (
    _id: string,
    updatedData: Partial<IUser>
  ): Promise<IUser | null> => {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name: updatedData.name,
        email: updatedData.email,
        phoneNumber: updatedData.phoneNumber,
        profileImage: updatedData.profileImage,
        checkedBadge: updatedData.checkedBadge,
      },
      { new: true }
    );

    return updatedUser;
  };

  // Email, Name으로 유저 id찾기
  public getIdByEmailAndName = async (
    email: string,
    name: string
  ): Promise<string | undefined> => {
    try {
      const user: IUser | null = await User.findOne({ email, name });
      if (!user) {
        throw new Error("유저를 찾을 수 없습니다.");
      }
      return user.id;
    } catch (error) {
      throw new Error("이메일과 이름으로 유저 ID를 가져오는데 실패했습니다.");
    }
  };

  // 토큰생성
  public getUserForToken = async (id: string): Promise<IUser | null> => {
    try {
      const user = await User.findOne(
        { _id: id },
        {
          _id: 1,
          id: 1,
          name: 1,
          email: 1,
        }
      );
      return user;
    } catch (error) {
      throw new Error("유저의 토큰을 생성하는데 실패했습니다.");
    }
  };

  public getUserRefreshToken = async (id: string): Promise<IUser | null> => {
    try {
      const user = await User.findOne({ id }, "refreshToken");
      return user;
    } catch (error) {
      throw new Error("유저의 refresh토큰을 발견하는데 실패했습니다.");
    }
  };

  public getUserPassword = async (_id: string): Promise<IUser | null> => {
    try {
      const user = await User.findOne({ _id }, "password");
      return user;
    } catch (error) {
      throw new Error("유저의 password를 발견하는데 실패했습니다.");
    }
  };

  public invalidateTokens = async (id: string) => {
    try {
      // Access 토큰과 Refresh 토큰 모두 무효화
      await User.updateOne(
        { id },
        {
          $unset: {
            accessToken: 1,
            refreshToken: 1,
          },
        }
      );
    } catch (error) {
      throw new Error("토큰 무효화에 실패했습니다.");
    }
  };

  public async checkPassword(_id: string, password: string) {
    try {
      const user = await User.findById(_id).select("+password");
      if (!user) {
        throw new Error("유저를 찾을 수 없습니다.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      return passwordMatch;
    } catch (error) {
      console.log(error);
      throw new Error("패스워드 확인에 실패했습니다.");
    }
  }

  public async updatePasswordFromEmail(email: string, tempPassword: string) {
    try {
      await User.updateOne(
        { email },
        {
          password: await hashPassword(tempPassword),
          isTempPassword: true,
        }
      );
    } catch (error) {
      throw new Error("패스워드 갱신에 실패했습니다.");
    }
  }

  public updatePasswordFromId = async (id: string, password: string) => {
    try {
      const hashedPassword = await hashPassword(password);
      await User.updateOne(
        { _id: id },
        {
          password: hashedPassword,
          isTempPassword: false,
        }
      );
    } catch (error) {
      throw new Error("패스워드 갱신에 실패했습니다.");
    }
  };

  public updateProfileImage = async (id: string, profileImage: string) => {
    try {
      await User.updateOne(
        { _id: id },
        {
          profileImage,
        }
      );
    } catch (error) {
      throw new Error("프로필 이미지 업로드에 실패했습니다.");
    }
  };

  public deleteUser = async (id: string) => {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("회원 탈퇴에 실패했습니다.");
    }
  };
}
