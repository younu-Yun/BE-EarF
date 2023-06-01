import { Router } from "express";
import questionController from "../controller/communityQuestionController";

const questionRouter = Router();

// 질문 생성
questionRouter.post("/", questionController.createQuestion);

// 특정 질문 조회
questionRouter.get("/:id", questionController.readQuestion);

// 질문 수정
questionRouter.put("/:id", questionController.updateQuestion);

// 질문 삭제
questionRouter.delete("/:id", questionController.deleteQuestion);

// 모든 질문 조회
questionRouter.get("/", questionController.readAllQuestions);

// 특정 질문에 좋아요 추가 혹은 취소
questionRouter.post("/like/:questionId", questionController.likeQuestion);

export default questionRouter;
