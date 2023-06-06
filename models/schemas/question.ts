import { Schema, model, Document } from "mongoose";

interface IQuestion extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  content: string;
  likeIds: Schema.Types.ObjectId[];
  commentIds: { type: Schema.Types.ObjectId; ref: "Comment" }[];
}

const QuestionSchema = new Schema<IQuestion>(
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
    commentIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export default model<IQuestion>("Question", QuestionSchema);
