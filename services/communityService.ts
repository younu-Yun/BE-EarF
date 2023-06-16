import { Types } from "mongoose";
import CommunityQuestion from "../models/schemas/communitySchema";

const questionService = {
  // 커뮤니티 질문 생성
  async createQuestion(userId: Types.ObjectId, title: string, content: string) {
    try {
      const question = new CommunityQuestion({
        userId,
        title,
        content,
        likeIds: [],
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
      const question = await CommunityQuestion.findOneAndUpdate(
        { _id: id },
        { title, content },
        { new: true },
      );
      return question;
    } catch (error) {
      console.log(error);
      throw new Error("커뮤니티 질문 수정에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문 삭제
  async deleteQuestion(id: string) {
    try {
      const question = await CommunityQuestion.findOneAndDelete({ _id: id });
      return question;
    } catch (error) {
      throw new Error("커뮤니티 질문 삭제에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문 조회
  async readQuestion(id: string) {
    try {
      const question = await CommunityQuestion.findOne({ _id: id });
      if (!question) {
        throw new Error("커뮤니티 질문을 찾을 수 없습니다.");
      }
      return question;
    } catch (error) {
      throw new Error("커뮤니티 질문을 불러오는데 실패하였습니다.");
    }
  },

  // 모든 커뮤니티 질문 조회
  async readAllQuestions() {
    try {
      const questions = await CommunityQuestion.find();
      return questions;
    } catch (error) {
      throw new Error("커뮤니티 질문을 모두 불러오는데 실패하였습니다.");
    }
  },

  // 좋아요 누르기 / 취소하기
  async likeQuestion(questionId: string, userId: Types.ObjectId) {
    try {
      const question = await CommunityQuestion.findById(questionId);
      if (!question) {
        throw new Error("질문을 찾을 수 없습니다.");
      }

      const likeIndex = question.likeIds.findIndex(id => id.equals(userId));
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
};

export default questionService;
