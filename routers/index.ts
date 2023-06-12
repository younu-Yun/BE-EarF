import { Request, Response, NextFunction, Router } from "express";
// ↓↓↓↓↓ 추가적인 router를 import 하세요! ↓↓↓↓↓ EX) import userRouter from "./user";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import questionRouter from "./questionRouter";
import commentRouter from "./commentRouter";
import boastRouter from "./boastRouter";
import diaryRouter from "./diaryRouter";
import todoRouter from "./todoRouter";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("EarF : first api router test");
  res.send("Hi! I'm router. path : /api");
});
// ↓↓↓↓↓ 추가적인 router를 고유 endpoint로 설정하세요 ↓↓↓↓↓ EX) router.use("/user", userRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/community", questionRouter);
router.use("/community", commentRouter);
router.use("/community", boastRouter);
router.use("/diary", diaryRouter);
router.use("/todo", todoRouter);

export default router;
