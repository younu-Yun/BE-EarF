import { Request, Response } from "express";
import questionService from "../services/questionService";
import { IUser } from "../models";

const questionController = {
  /**
   * 새로운 질문 생성.
   * 요청 본문에서 작성자, 제목, 내용을 추출하여 questionService.createQuestion 호출.
   * 생성된 질문을 클라이언트에게 201 상태 코드와 함께 JSON 형식으로 응답.
   */
  async createQuestion(req: Request, res: Response) {
    try {
      const { id, name, profileImage, checkedBadge } = req.user as IUser;
      const { title, content } = req.body;
      const question = await questionService.createQuestion(
        id,
        name,
        profileImage,
        checkedBadge,
        title,
        content,
      );
      res.status(201).json(question);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  /**
   * 기존 질문 업데이트.
   * 요청 URL의 매개변수에서 질문 ID를 추출하고, 요청 본문에서 제목과 내용을 추출하여 questionService.updateQuestion 호출.
   * 업데이트된 질문을 클라이언트에게 JSON 형식으로 응답.
   */
  async updateQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      console.log(req.body);
      const question = await questionService.updateQuestion(id, title, content);
      res.json(question);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  /**
   * 질문 삭제.
   * 요청 URL의 매개변수에서 질문 ID를 추출하여 questionService.deleteQuestion을 호출합니다.
   * 삭제된 질문을 클라이언트에게 JSON 형식으로 응답합니다.
   */
  async deleteQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await questionService.deleteQuestion(id);
      res.json(question);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  /**
   * 특정 질문 조회.
   * 요청 URL의 매개변수에서 질문 ID를 추출하여 questionService.readQuestion을 호출.
   * 조회된 질문을 클라이언트에게 JSON 형식으로 응답.
   */
  async readQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await questionService.readQuestion(id);
      res.json(question);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  /**
   * 모든 질문 조회.
   * questionService.readAllQuestions을 호출하여 모든 질문을 가져온 뒤,
   * 클라이언트에게 JSON 형식으로 응답.
   */
  async readAllQuestions(req: Request, res: Response) {
    try {
      const sort = (req.query.sort as string) || "latest"; // 정렬 기준
      const page = parseInt(req.query.page as string) || 1; // 페이지 번호
      const limit = parseInt(req.query.limit as string) || 10; // 페이지당 항목 수
      const questions = await questionService.readAllQuestions(
        sort,
        page,
        limit,
      );
      res.json(questions);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  /**
   * 특정 질문에 좋아요 추가.
   * 요청 URL의 매개변수에서 질문 ID를 추출하고, 요청 본문에서 사용자 ID를 추출하여 questionService.likeQuestion을 호출.
   * 좋아요가 추가된 질문을 클라이언트에게 JSON 형식으로 응답.
   */
  async likeQuestion(req: Request, res: Response) {
    try {
      const { questionId } = req.params;
      const { userId } = req.body;
      const question = await questionService.likeQuestion(questionId, userId);
      res.json(question);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  /**
   * 특정 질문에 댓글 추가.
   * 요청 URL의 매개변수에서 질문 ID를 추출하고, 요청 본문에서 댓글 ID를 추출하여 questionService.addCommentToQuestion을 호출.
   * 댓글이 추가된 질문을 클라이언트에게 JSON 형식으로 응답.
   */
  async addCommentToQuestion(req: Request, res: Response) {
    try {
      const { questionId } = req.params;
      const { commentId } = req.body;
      const question = await questionService.addCommentToQuestion(
        questionId,
        //@ts-ignore
        new Types.ObjectId(commentId),
      );
      res.json(question);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },
};

export default questionController;
