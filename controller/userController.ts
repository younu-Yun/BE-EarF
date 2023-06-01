import { Request, Response } from "express";
import UserService from "../services/userService";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

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
        .json({ message: "사용자가 성공적으로 등록되었습니다.", user });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, password } = req.body;
      const token = await this.userService.loginUser(id, password);
      res.status(200).json({ message: "로그인에 성공하였습니다.", token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}
