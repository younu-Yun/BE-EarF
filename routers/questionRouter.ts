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

// 로그인된 사용자가 작성한 모든 질문 조회
questionRouter.get(
  "/questions/user",
  authAccess,
  questionController.readUserQuestions,
);

// 모든 질문 조회(정렬기능)
questionRouter.get("/questions", questionController.readAllQuestionsWithSort);

//모든 질문 조회
questionRouter.get("/questions-all", questionController.readAllQuestions);

// 좋아요가 많은 게시글을 최신순으로 5개만 가지고 오기
questionRouter.get(
  "/questions/most-liked",
  questionController.readMostLikedLatestQuestions,
);

// 댓글이 없는 가장 오래된 질문들 조회
questionRouter.get(
  "/questions/no-comments",
  questionController.readOldestQuestionsWithNoComments,
);

// 가장 최근에 댓글이 달린 질문 조회
questionRouter.get(
  "/questions/latest-commented",
  questionController.readLatestCommentedQuestion,
);

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
