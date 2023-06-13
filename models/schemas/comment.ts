import { Schema, Document, model } from "mongoose";

interface ILike {
  _id: string;
  name: string;
}

interface IComment extends Document {
  postId: Schema.Types.ObjectId; // 게시글 ObjectId 참조.
  id: string;
  name: string;
  profileImage: string;
  checkedBadge: string;
  comment: string;
  likeIds: ILike[];
}

const LikeSchema = new Schema<ILike>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

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
      default: "신규",
      enum: ["최초", "연속", "신규", "텀블", "교통", "버켓", "커뮤"],
    },
    comment: {
      type: String,
      required: true,
    },
    likeIds: [LikeSchema],
  },
  { timestamps: true },
);

export default model<IComment>("Comment", CommentSchema);
