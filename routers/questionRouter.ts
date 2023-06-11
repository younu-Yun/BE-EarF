import { Router } from "express";
import questionController from "../controller/questionController";
import authAccess from "../middlewares/authAccess";

const questionRouter = Router();

// 질문 생성
questionRouter.post(
  "/questions",
  authAccess,
  questionController.createQuestion,
);

// 모든 질문 조회
questionRouter.get("/questions", questionController.readAllQuestions);

// 특정 질문 조회
questionRouter.get("/questions/:id", questionController.readQuestion);

// 질문 수정
questionRouter.patch(
  "/questions/:id",
  authAccess,
  questionController.updateQuestion,
);

// 질문 삭제
questionRouter.delete(
  "/questions/:id",
  authAccess,
  questionController.deleteQuestion,
);

// 특정 질문에 좋아요 추가 혹은 취소
questionRouter.patch(
  "/questions/:questionId/like",
  authAccess,
  questionController.toggleLike,
);

export default questionRouter;
