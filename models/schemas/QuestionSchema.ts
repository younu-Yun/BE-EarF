import { Schema, Document, model, Types } from "mongoose";

// 인터페이스 정의

interface IQuestion {
  userId: Types.ObjectId; // 작성자 ObjectId 참조.
  title: string; // 제목
  content: string; // 내용
  likeIds: Types.ObjectId[]; // 좋아요를 누른 사용자의 ObjectId 배열
  commentIds: Types.ObjectId[]; //댓글
}

interface IQuestionDocument extends IQuestion, Document {}

// 스키마 정의

const QuestionSchema = new Schema<IQuestionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    commentIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true },
);

// 모델 생성 및 내보내기

export default model<IQuestionDocument>("Question", QuestionSchema);
