import { Schema, Document, model } from "mongoose";

interface IComment extends Document {
  postId: Schema.Types.ObjectId; // 게시글 ObjectId 참조.
  id: string;
  name: string;
  profileImage: string;
  checkedBadge: string;
  comment: string;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "question",
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    checkedBadge: {
      type: String,
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
