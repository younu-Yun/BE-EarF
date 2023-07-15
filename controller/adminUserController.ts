import { Request, Response } from "express";
import AdminUserService from "../services/adminUserService";

export default class AdminUserController {
  private adminUserService: AdminUserService;

  constructor() {
    this.adminUserService = new AdminUserService();
  }

  public getUserAll = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const userlist = await this.adminUserService.adminReadUser(page);
      res.json(userlist);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getUserByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const searchedUser = await this.adminUserService.adminReadUserByName(
        name
      );
      res.json(searchedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public updateUserById = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const { name, email, phoneNumber } = req.body;
      const updatedUser = await this.adminUserService.adminUpdateUser(_id, {
        name,
        email,
        phoneNumber,
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const { _id } = req.params;
      const deletedUser = await this.adminUserService.adminDeletedUser(_id);
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}
