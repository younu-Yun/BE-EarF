import { Request, Response, NextFunction } from "express";
import passport from "passport";
import UserService from "../services/userService";

const userService = new UserService();

const refreshTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("refresh", { session: false }, async (err: any) => {
    if (err) {
      console.log("refresh authenticate 에러");
      res
        .status(500)
        .send({ message: `토큰검증 미들웨어 에러: ${err.message}` });
    } else {
      const { id } = req.user as { id: string };
      const userRefreshToken = await userService.getUserRefreshToken(id);
      const inputRefreshToken = req.headers.authorization?.substring(7);

      if (userRefreshToken?.refreshToken === inputRefreshToken) {
        console.log("refresh Authorized");
        next();
      } else {
        res.status(403).send({ message: "refresh토큰이 만료되었습니다." });
      }
    }
  })(req, res, next);
};

export default refreshTokenMiddleware;
