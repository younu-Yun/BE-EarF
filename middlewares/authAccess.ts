import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authAccess = (req: Request, res: Response, next: NextFunction) => {
  console.log("시작!");
  passport.authenticate("access", { session: false })(
    req,
    res,
    (err: Error) => {
      if (err) {
        console.log("뭐라고 말좀 해봐", err);
        res.status(500).send(err.message);
      } else {
        console.log("말좀해");
        next();
      }
    }
  );
};

export default authAccess;
