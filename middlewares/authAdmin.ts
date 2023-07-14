import { Request, Response, NextFunction } from "express";
import { IUser, User } from "../models/index";

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user as IUser;
  const user = await User.findOne({ _id });

  if (!user || !user.isAdmin) {
    res.status(403).json({
      message:
        "관리자 접근 권한이 필요합니다. 관리자 계정으로 다시 로그인해주세요",
    });
  } else {
    next();
  }
};

export default authAdmin;
