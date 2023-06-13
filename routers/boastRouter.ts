import { Router } from "express";
import BoastController from "../controller/boastController";
import authAccess from "../middlewares/authAccess";

const boastRouter = Router();

// 좋아요가 많은 상위 5개의 자랑하기 게시글 불러오기
boastRouter.get("/boasts/most-liked", BoastController.loadTop5Boast);

// 자랑하기 단일 게시글 불러오기
boastRouter.get("/boasts/:id", BoastController.loadSingleDiary);

// 자랑하기 게시글 불러오기 (태그 포함)
boastRouter.get("/boasts", BoastController.loadBoast);

// 자랑하기 게시글 좋아요/ 취소
boastRouter.patch("/boasts/like/:id", authAccess, BoastController.toggleLike);

export default boastRouter;
