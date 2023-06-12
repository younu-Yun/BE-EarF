import { Router } from "express";
import BoastController from "../controller/boastController";
import authAccess from "../middlewares/authAccess";

const boastRouter = Router();
//자랑하기 단일 게시글 불러오기
boastRouter.get("/boasts/:id", BoastController.loadSingleDiary);
// 자랑하기 게시글 불러오기
boastRouter.get("/boasts", BoastController.loadBoast);
// 자랑하기 게시글 좋아요/ 취소
boastRouter.post("/boasts/:id/like", authAccess, BoastController.toggleLike);

export default boastRouter;
