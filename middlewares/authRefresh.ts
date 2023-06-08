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
        console.log("refresh authenticate 에러");
        res
          .status(500)
          .send({ message: `토큰검증 미들웨어 에러: ${err.message}` });
        // } else if (!user) {
        //   res.status(403).send({ message: "유저가 없습니다." });
      } else {
        req.user = user;
        //const { id } = req.user as IUser;
        const { id } = user;
        const userRefreshToken = await userService.getUserRefreshToken(id);
        const inputRefreshToken = req.headers.authorization?.substring(7);

        if (userRefreshToken?.refreshToken === inputRefreshToken) {
          console.log("refresh Authorized");
          next();
        } else {
          console.log("이쪽으로 왜오니?");
          res.status(403).send({ message: "refresh토큰이 만료되었습니다!!!." });
        }
      }
    }
  )(req, res, next);
};

export default refreshTokenMiddleware;
