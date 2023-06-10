import mongoose, { Schema, Types } from "mongoose";
import Question from "../models/schemas/question";
import Comment from "../models/schemas/comment";

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
      // 질문 찾기
      const question = await Question.findById(id);
      if (!question) {
        throw new Error("커뮤니티 질문을 찾을 수 없습니다.");
      }

      // 해당 질문에 달린 모든 댓글 삭제
      await Comment.deleteMany({ _id: { $in: question.commentIds } });

      // 질문 삭제
      await Question.deleteOne({ _id: id });

      return question;
    } catch (error) {
      throw new Error("커뮤니티 질문 삭제에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문 조회
  async readQuestion(id: string) {
    try {
      const question = await Question.aggregate([
        { $match: { _id: new Types.ObjectId(id) } },
        {
          $addFields: {
            numLikes: { $size: "$likeIds" },
            numComments: { $size: "$commentIds" },
          },
        },
      ]);

      if (!question || question.length === 0) {
        throw new Error("커뮤니티 질문을 찾을 수 없습니다.");
      }

      return question[0];
    } catch (error) {
      throw new Error("커뮤니티 질문을 불러오는데 실패하였습니다.");
    }
  },

  // 모든 커뮤니티 질문 조회 (정렬 방식 선택 가능)
  async readAllQuestions(
    sort: string = "latest",
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      const skip = (page - 1) * limit;
      let questions;
      if (sort === "oldest") {
        questions = await Question.aggregate([
          {
            $addFields: {
              numLikes: { $size: "$likeIds" },
              numComments: { $size: "$commentIds" },
            },
          },
          {
            $sort: { createdAt: 1 }, // 생성된 시간 순 (과거 순)
          },
        ])
          .skip(skip)
          .limit(limit);
      } else if (sort === "latest") {
        questions = await Question.aggregate([
          {
            $addFields: {
              numLikes: { $size: "$likeIds" },
              numComments: { $size: "$commentIds" },
            },
          },
          {
            $sort: { createdAt: -1 }, // 생성된 시간 순 (최신 순)
          },
        ])
          .skip(skip)
          .limit(limit);
      } else if (sort === "mostComments") {
        questions = await Question.aggregate([
          {
            $addFields: {
              numLikes: { $size: "$likeIds" },
              numComments: { $size: "$commentIds" },
            },
          },
          {
            $sort: { numComments: -1 }, // 댓글 수가 많은 순으로 정렬
          },
        ])
          .skip(skip)
          .limit(limit);
      } else if (sort === "mostLikes") {
        // 좋아요가 많은 순으로 정렬하는 로직 추가
        questions = await Question.aggregate([
          {
            $addFields: {
              numLikes: { $size: "$likeIds" },
              numComments: { $size: "$commentIds" },
            },
          },
          {
            $sort: { numLikes: -1 }, // 좋아요가 많은 순으로 정렬
          },
        ])
          .skip(skip)
          .limit(limit);
      } else {
        throw new Error("정렬 방식이 잘못되었습니다."); // 잘못된 정렬 방식
      }
      return questions;
    } catch (error) {
      throw new Error("커뮤니티 질문을 모두 불러오는데 실패하였습니다.");
    }
  },

  // 좋아요 누르기 / 취소하기
  async toggleLike(questionId: string, userId: string) {
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        throw new Error("질문을 찾을 수 없습니다.");
      }

      const likeIndex = question.likeIds.indexOf(userId);
      if (likeIndex === -1) {
        question.likeIds.push(userId);
      } else {
        question.likeIds.splice(likeIndex, 1);
      }
      await question.save();
      return question;
    } catch (error) {
      console.error(error);
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
