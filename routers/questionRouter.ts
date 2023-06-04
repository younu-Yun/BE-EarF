import { Router } from "express";
import questionController from "../controller/questionController";

const questionRouter = Router();

// 질문 생성
questionRouter.post("/questions", questionController.createQuestion);

// 모든 질문 조회
questionRouter.get("/questions", questionController.readAllQuestions);

// 특정 질문 조회
questionRouter.get("/questions/:id", questionController.readQuestion);

// 질문 수정
questionRouter.patch("/questions/:id", questionController.updateQuestion);

// 질문 삭제
questionRouter.delete("/questions/:id", questionController.deleteQuestion);

// 특정 질문에 좋아요 추가 혹은 취소
questionRouter.post(
  "/questions/:questionId/like",
  questionController.likeQuestion,
);

export default questionRouter;
