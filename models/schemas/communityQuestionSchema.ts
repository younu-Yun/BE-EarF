import mongoose, { Document, Schema } from "mongoose";

// Mongoose 및 관련 타입 가져오기

interface ICommunityQuestion {
  author: Schema.Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: Schema.Types.ObjectId[];
}

// CommunityQuestion에 대한 필수 필드 및 타입을 정의하는 인터페이스

interface CommunityQuestionDocument extends ICommunityQuestion, Document {}

// Mongoose Document를 확장하여 CommunityQuestionDocument 인터페이스 정의

const CommunityQuestionSchema = new Schema<CommunityQuestionDocument>({
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
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// CommunityQuestion의 Mongoose 스키마 정의

export default mongoose.model<CommunityQuestionDocument>(
  "CommunityQuestion",
  CommunityQuestionSchema,
);

// "CommunityQuestion" 모델 생성 및 내보내기
