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
      throw new Error("커뮤니티 질문 생성에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문 수정
  async updateQuestion(
    userId: string,
    questionId: string,
    title: string,
    content: string,
  ) {
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        throw new Error("커뮤니티 질문을 찾을 수 없습니다.");
      }

      // 질문의 작성자 ID와 요청한 사용자의 ID가 일치하는지 확인
      if (question.id !== userId) {
        throw new Error("작성자만 질문을 수정할 수 있습니다.");
      }

      question.title = title;
      question.content = content;
      await question.save();

      return question;
    } catch (error) {
      throw new Error("커뮤니티 질문 수정에 실패하였습니다.");
    }
  },

  // 커뮤니티 질문 삭제
  async deleteQuestion(userId: string, questionId: string) {
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        throw new Error("커뮤니티 질문을 찾을 수 없습니다.");
      }

      // 질문의 작성자 ID와 요청한 사용자의 ID가 일치하는지 확인
      if (question.id !== userId) {
        throw new Error("작성자만 질문을 삭제할 수 있습니다.");
      }

      // 해당 질문에 달린 모든 댓글 삭제
      await Comment.deleteMany({ _id: { $in: question.commentIds } });

      // 질문 삭제
      await Question.deleteOne({ _id: questionId });

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
        throw new Error("해당 ID의 커뮤니티 질문을 찾을 수 없습니다.");
      }

      return question[0];
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new Error("데이터베이스 조회에 실패하였습니다.");
      }
      throw new Error("커뮤니티 질문을 불러오는데 실패하였습니다.");
    }
  },

  // 모든 커뮤니티 질문 조회 (전체 조회)
  async readAllQuestions() {
    try {
      const questions = await Question.find({});
      return questions;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new Error("데이터베이스 조회에 실패하였습니다.");
      }
      throw new Error("커뮤니티 질문을 모두 불러오는데 실패하였습니다.");
    }
  },

  // 모든 커뮤니티 질문 조회 (정렬 방식 선택 가능)
  async readAllQuestionsWithSort(
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
      if (error instanceof mongoose.Error) {
        throw new Error("데이터베이스 조회에 실패했습니다");
      }
      throw new Error("커뮤니티 질문을 모두 불러오는데 실패하였습니다.");
    }
  },

  // 댓글이 0개인 질문 중 가장 오래된 것 8개 조회
  async readOldestQuestionsWithNoComments(limit: number = 8) {
    try {
      const questions = await Question.aggregate([
        {
          $addFields: {
            numComments: { $size: "$commentIds" },
          },
        },
        {
          $match: { numComments: 0 }, // 댓글이 0개인 질문만 선택
        },
        {
          $sort: { createdAt: 1 }, // 생성된 시간 순 (과거 순)
        },
      ]).limit(limit);
      return questions;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new Error("데이터베이스 조회에 실패했습니다.");
      }
      throw new Error(
        "댓글이 없는 가장 오래된 질문을 불러오는데 실패하였습니다.",
      );
    }
  },

  // 좋아요가 많은 게시글을 최신순으로 5개만 가지고 오기
  async readMostLikedLatestQuestions(limit: number = 5) {
    try {
      const questions = await Question.aggregate([
        {
          $addFields: {
            numLikes: { $size: "$likeIds" },
            numComments: { $size: "$commentIds" },
          },
        },
        {
          $sort: { numLikes: -1, createdAt: -1 }, // 좋아요가 많은 순과 최신 순으로 정렬
        },
      ]).limit(limit);
      return questions;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new Error("데이터베이스 조회에 실패하였습니다.");
      }
      throw new Error("좋아요가 많은 게시글을 불러오는데 실패하였습니다.");
    }
  },

  // 가장 최근에 댓글이 달린 게시글과 그 댓글을 가져오기
  async readLatestCommentedQuestion() {
    try {
      const latestComment = await Comment.findOne().sort({ createdAt: -1 });
      if (!latestComment) {
        throw new Error("댓글을 찾을 수 없습니다.");
      }

      const question = await Question.findById(latestComment.postId);
      if (!question) {
        throw new Error("게시글을 찾을 수 없습니다.");
      }

      const result = {
        title: question.title,
        comment: latestComment.comment,
      };

      return result;
    } catch (error) {
      console.error(error);
      throw new Error(
        "가장 최근에 댓글이 달린 게시글을 불러오는데 실패하였습니다.",
      );
    }
  },

  async searchQuestionsByKeyword(
    keyword: string,
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      const skip = (page - 1) * limit;

      const questions = await Question.aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: keyword, $options: "i" } },
              { content: { $regex: keyword, $options: "i" } },
            ],
          },
        },
        {
          $addFields: {
            numLikes: { $size: "$likeIds" },
            numComments: { $size: "$commentIds" },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);

      return questions;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new Error("데이터베이스 조회에 실패하였습니다.");
      }
      throw new Error("키워드로 커뮤니티 질문을 검색하는데 실패하였습니다.");
    }
  },

  // 로그인된 사용자가 작성한 모든 질문 조회
  async readUserQuestions(userId: string) {
    try {
      const questions = await Question.find({ id: userId }).sort({
        createdAt: -1,
      });
      if (!questions || questions.length === 0) {
        throw new Error("사용자가 작성한 질문을 찾을 수 없습니다.");
      }
      return questions;
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new Error("데이터베이스 조회에 실패하였습니다."); // 데이터베이스 에러
      }
      throw new Error("사용자가 작성한 질문을 불러오는데 실패하였습니다."); // 그 외의 에러
    }
  },

  // 좋아요 누르기 / 취소하기
  async toggleLike(questionId: string, _Id: string) {
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        throw new Error("질문을 찾을 수 없습니다.");
      }

      const likeIndex = question.likeIds.indexOf(_Id);
      if (likeIndex === -1) {
        question.likeIds.push(_Id);
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
