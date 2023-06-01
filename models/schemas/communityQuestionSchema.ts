import { Schema, Document, model, Types } from "mongoose";

// 인터페이스 정의

interface ICommunityQuestion {
  author: Types.ObjectId; // 작성자 ObjectId 참조.
  title: string; // 제목
  content: string; // 내용
  createdAt: Date; // 작성일
  updatedAt: Date; // 수정일
  likes: Types.ObjectId[]; // 좋아요를 누른 사용자의 ObjectId 배열
}

interface ICommunityQuestionDocument extends ICommunityQuestion, Document {}

// 스키마 정의

const CommunityQuestionSchema = new Schema<ICommunityQuestionDocument>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

// 모델 생성 및 내보내기

export default model<ICommunityQuestionDocument>(
  "CommunityQuestion",
  CommunityQuestionSchema,
);
