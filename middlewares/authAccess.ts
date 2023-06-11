import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authAccess = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("access", { session: false })(
    req,
    res,
    (err: Error) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        next();
      }
    }
  );
};

export default authAccess;
