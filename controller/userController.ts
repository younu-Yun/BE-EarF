import { Request, Response } from "express";
import UserService from "../services/userService";
import { verifyRefreshToken, deleteRefreshToken } from "../utils/jwt";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // 유저 회원가입
  public registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, password, name, email, phoneNumber } = req.body;
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
  public loginUser = async (req: Request, res: Response): Promise<void> => {
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

  // 리프레시 토큰 갱신
  public refreshTokens = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const { accessToken, refreshToken: newRefreshToken } =
        await this.userService.refreshTokens(refreshToken);
      res.status(200).json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  };

  // 유저 로그아웃
  public logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const decoded = verifyRefreshToken(refreshToken);
      const userId = decoded.sub;
      await deleteRefreshToken(userId);
      res.status(200).json({ message: "로그아웃되었습니다." });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // ID로 유저 가져오기
  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "유저정보를 불러오는데 실패하였습니다." });
    }
  }

  // 모든 유저 가져오기
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "전체유저정보를 불러오는데 실패하였습니다." });
    }
  }

  // ID로 유저 업데이트하기
  static async updateUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedUser = await UserService.updateUserById(id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "유저정보를 수정하는데 실패하였습니다." });
    }
  }
}
