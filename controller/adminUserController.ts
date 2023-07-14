import { Request, Response } from "express";
import AdminService from "../services/adminUserService";

export default class AdminUserController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public getUserAll = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page || 1);
      const userlist = await this.adminService.adminReadUser(page);
      res.json(userlist);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getUserByName = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };

  public updateUserById = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };
}
