import { Schema } from "mongoose";
import Question from "../models/schemas/question";

const questionService = {
  // 커뮤니티 질문 생성
  async createQuestion(
    id: string,
    name: string,
    profileImage: string,
    checkedBadge: string,
    title: string,
    content: string,
  ) {
    try {
      const question = new Question({
        id,
        name,
        profileImage,
        checkedBadge,
        title,
        content,
        likeIds: [],
        commentIds: [],
      });
      await question.save();
      return question;
    } catch (error) {
      console.log(error);
      throw new Error("커뮤니티 질문 생성에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문 수정
  async updateQuestion(id: string, title: string, content: string) {
    try {
      const question = await Question.findByIdAndUpdate(
        id,
        { title: title, content: content },
        { new: true, useFindAndModify: false },
      );
      if (!question) {
        throw new Error("커뮤니티 질문을 찾을 수 없습니다.");
      }
      return question;
    } catch (error) {
      console.error(error);
      throw new Error("커뮤니티 질문 수정에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문 삭제
  async deleteQuestion(id: string) {
    try {
      const question = await Question.findOneAndDelete({ _id: id });
      return question;
    } catch (error) {
      throw new Error("커뮤니티 질문 삭제에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문 조회
  async readQuestion(id: string) {
    try {
      const question = await Question.findOne({ _id: id });
      if (!question) {
        throw new Error("커뮤니티 질문을 찾을 수 없습니다.");
      }
      return question;
    } catch (error) {
      throw new Error("커뮤니티 질문을 불러오는데 실패하였습니다.");
    }
  },

  // ...

  // 모든 커뮤니티 질문 조회 (정렬 방식 선택 가능)
  // 모든 커뮤니티 질문 조회 (정렬 방식 선택 가능)
  async readAllQuestions(sort: string = "latest") {
    try {
      let questions;
      if (sort === "oldest") {
        questions = await Question.aggregate([
          {
            $addFields: {
              numComments: { $size: "$commentIds" },
            },
          },
          {
            $sort: { createdAt: 1 }, // 생성된 시간 순 (과거 순)
          },
        ]);
      } else if (sort === "latest") {
        questions = await Question.aggregate([
          {
            $addFields: {
              numComments: { $size: "$commentIds" },
            },
          },
          {
            $sort: { createdAt: -1 }, // 생성된 시간 순 (최신 순)
          },
        ]);
      } else if (sort === "mostComments") {
        questions = await Question.aggregate([
          {
            $addFields: {
              numComments: { $size: "$commentIds" },
            },
          },
          {
            $sort: { numComments: -1 }, // 댓글 수가 많은 순으로 정렬
          },
        ]);
      } else {
        throw new Error("정렬 방식이 잘못되었습니다."); // 잘못된 정렬 방식
      }
      return questions;
    } catch (error) {
      throw new Error("커뮤니티 질문을 모두 불러오는데 실패하였습니다.");
    }
  },

  // 좋아요 누르기 / 취소하기
  async likeQuestion(questionId: string, userId: Schema.Types.ObjectId) {
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        throw new Error("질문을 찾을 수 없습니다.");
      }

      const likeIndex = question.likeIds.findIndex(
        id => id.toString() === userId.toString(),
      );
      if (likeIndex === -1) {
        // 좋아요 누르기: 사용자 ID를 'likes' 배열에 추가
        question.likeIds.push(userId);
      } else {
        // 좋아요 취소: 사용자 ID를 'likes' 배열에서 제거
        question.likeIds.splice(likeIndex, 1);
      }

      await question.save();
      return question;
    } catch (error) {
      throw new Error("좋아요 기능 처리에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문에 댓글 ID 추가
  async addCommentToQuestion(
    questionId: string,
    commentId: Schema.Types.ObjectId,
  ) {
    try {
      //게시글 찾아서 댓글 추가
      const question = await Question.findByIdAndUpdate(
        questionId,
        { $push: { commentIds: commentId } },
        { new: true, useFindAndModify: false },
      );

      if (!question) {
        throw new Error("질문을 찾을 수 없습니다.");
      }

      return question;
    } catch (error) {
      console.error(error);
      throw new Error("질문에 댓글을 추가하는 데 실패하였습니다.");
    }
  },
};

export default questionService;
