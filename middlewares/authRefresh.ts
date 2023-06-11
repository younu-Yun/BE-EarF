import { Request, Response, NextFunction } from "express";
import passport from "passport";
import UserService from "../services/userService";
import { IUser } from "../models";

const userService = new UserService();

const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "refresh",
    { session: false },
    async (err: Error, user: IUser) => {
      if (err) {
        res
          .status(500)
          .send({ message: `토큰검증 미들웨어 에러: ${err.message}` });
      } else {
        req.user = user;
        const { id } = user;
        const userRefreshToken = await userService.getUserRefreshToken(id);
        const inputRefreshToken = req.headers.authorization?.substring(7);

        if (userRefreshToken?.refreshToken === inputRefreshToken) {
          next();
        } else {
          res.status(403).send({ message: "refresh토큰이 만료되었습니다!!!." });
        }
      }
    }
  )(req, res, next);
};

export default refreshTokenMiddleware;
