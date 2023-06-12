import { Request, RequestHandler, Response } from "express";
import UserService from "../services/userService";
import { setUserToken } from "../utils/jwt";
import { IUser, User } from "../models";
import { randomPassword } from "../utils/randomPassword";
import sendmail from "../utils/sendmail";
import { hashPassword } from "../utils/hashPassword";
import bcrypt from "bcrypt";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // 유저 회원가입
  public registerUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id, password, name, email, phoneNumber } = req.body;
      const registeredId = await this.userService.getUserByloginId(id);
      if (registeredId) {
        return res.status(400).json({ message: "이미 등록된 ID입니다." });
      }
      const user = await this.userService.registerUser(
        id,
        password,
        name,
        email,
        phoneNumber
      );
      res
        .status(200)
        .json({ message: "회원가입이 정상적으로 이루어졌습니다.", user });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 유저 로그인
  public loginUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id, password } = req.body;
      const { accessToken, refreshToken } = await this.userService.loginUser(
        id,
        password
      );
      res.status(200).json({
        message: "로그인에 성공하였습니다.",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  };

  // 유저 로그아웃
  public logoutUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.user as IUser;
      if (id) {
        await this.userService.invalidateTokens(id);
        res.status(200).json({ message: "로그아웃되었습니다." });
      } else {
        res.status(400).json({ error: "사용자를 식별할 수 없습니다." });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 유저 정보 가져오기
  public getUserById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { _id } = req.user as IUser;
      const user = await this.userService.getUserById(_id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "유저정보를 불러오는데 실패하였습니다." });
    }
  };

  // 모든 유저 가져오기
  public getAllUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "전체유저정보를 불러오는데 실패하였습니다." });
    }
  };

  // 유저 정보 업데이트하기
  public updateUserById: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { _id } = req.user as IUser;
      const updatedUser = await this.userService.updateUserById(_id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "유저정보를 수정하는데 실패하였습니다." });
    }
  };

  // 이메일과 이름으로 아이디 찾기
  public getIdByEmailAndName = async (req: Request, res: Response) => {
    try {
      const { email, name } = req.body;
      const userId = await this.userService.getIdByEmailAndName(email, name);
      res.json({ id: userId });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 엑세스 토큰 발급
  public createAccessToken = async (req: Request, res: Response) => {
    try {
      const { _id } = req.user as IUser;
      const userForToken: IUser | null = await this.userService.getUserForToken(
        _id
      );
      if (userForToken) {
        const accessToken = await setUserToken(userForToken, true);
        res.send(accessToken);
      } else {
        res.status(404).json({ error: "유저를 찾을 수 없습니다." });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 비밀번호 확인
  public checkPassword = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const { _id } = req.user as IUser;
      const checkedPassword = await this.userService.checkPassword(
        _id,
        password
      );
      if (checkedPassword) {
        res.status(200).json({
          message: "비밀번호가 확인되었습니다. 마이페이지로 이동합니다.",
        });
      } else {
        res.status(400).json({
          message: "비밀번호가 일치하지 않습니다. 다시 입력해주세요!",
        });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 비밀번호 초기화
  public resetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const tempPassword = randomPassword();
      const user = await this.userService.getUserByEmail(email);

      if (user === null) {
        return res
          .status(400)
          .json({ message: "해당 메일을 가진 유저가 없습니다." });
      }

      await this.userService.updatePasswordFromEmail(email, tempPassword);
      await sendmail(email, "임시 비밀번호", `${tempPassword}`);

      res.status(200).send(`${email}으로 임시비밀번호를 전송했습니다.`);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 비밀번호 변경
  public changePassword = async (req: Request, res: Response) => {
    try {
      const { _id } = req.user as IUser;
      const { currentPassword, password } = req.body;
      const user = await this.userService.getUserPassword(_id);

      if (!user) {
        return res.status(400).json({ message: "유저를 찾을 수 없습니다." });
      }

      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }

      await this.userService.updatePasswordFromId(_id, password);

      res.status(200).send("비밀번호 변경이 완료되었습니다.");
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 프로필 이미지 변경
  public changeProfile = async (req: Request, res: Response) => {
    try {
      const { _id } = req.user as IUser;
      const profileImage = `http://34.64.216.86:4735/${req.file?.filename}`;
      const updatedImage = await this.userService.updateProfileImage(
        _id,
        profileImage
      );
      res.send(updatedImage);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 프로필 이미지 삭제
  public deleteProfile = async (req: Request, res: Response) => {
    try {
      const { _id } = req.user as IUser;
      // 파일이름만 default이미지로 바꾸면 됨.
      const profileImage = `http://34.64.216.86:4735/${req.file?.filename}`;
      const defaultImage = await this.userService.updateProfileImage(
        _id,
        profileImage
      );
      res.send(defaultImage);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // 유저 회원 탈퇴
  public deleteUser = async (req: Request, res: Response) => {
    try {
      const { _id } = req.user as IUser;
      await this.userService.deleteUser(_id);
      res.status(200).json({
        message:
          "회원 탈퇴가 정상적으로 완료되었습니다. 그동안 EarF를 이용해주셔서 감사합니다",
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}
