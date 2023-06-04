import { Schema, Document, model, Types } from "mongoose";

interface ICommunityComment {
  postId: Types.ObjectId; // 게시글 ObjectId 참조.
  userId: Types.ObjectId; // 댓글 작성자 ObjectId 참조.
  comment: string;
}

interface ICommunityCommentDocument extends ICommunityComment, Document {}

const CommunityCommentSchema = new Schema<ICommunityCommentDocument>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<ICommunityCommentDocument>(
  "CommunityComment",
  CommunityCommentSchema,
);
