import { Schema } from "mongoose";

const CommunityBoastSchema = new Schema({
  //User 모델 참조(User Name, UserImageUrl을 author로 대체)
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
  like: {
    type: Number,
    default: 0,
  },
});

export { CommunityBoastSchema };
