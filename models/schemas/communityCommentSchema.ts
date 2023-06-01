import { Schema } from "mongoose";

const communityCommentSchema = new Schema({
  //포스팅한 게시글의 id를 참조
  post: {
    type: Schema.Types.ObjectId,
    ref: "CommunityPost",
    required: true,
  },
  //댓글 작성자 User 정보 참조
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export { communityCommentSchema };
