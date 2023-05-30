import { Request, Response, NextFunction, Router } from "express";
// ↓↓↓↓↓ 추가적인 router를 import 하세요! ↓↓↓↓↓ EX) import userRouter from "./user";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("EarF : first api router test");
  res.send("Hi! I'm router. path : /api");
});
// ↓↓↓↓↓ 추가적인 router를 고유 endpoint로 설정하세요 ↓↓↓↓↓ EX) router.use("/user", userRouter);

export default router;
