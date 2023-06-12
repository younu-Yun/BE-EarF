import { Router } from "express";
import BoastController from "../controller/boastController";

const boastRouter = Router();

// 자랑하기 게시글 불러오기
boastRouter.get("/boasts", BoastController.loadBoast);

export default boastRouter;
