import { Schema, Document, model, Types } from "mongoose";

interface IComment extends Document {
  postId: Schema.Types.ObjectId; // 게시글 ObjectId 참조.
  userId: Schema.Types.ObjectId; // 댓글 작성자 ObjectId 참조.
  comment: string;
}

const CommentSchema = new Schema<IComment>(
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

export default model<IComment>("Comment", CommentSchema);
