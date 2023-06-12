import { Schema, model, Document } from "mongoose";

export interface IBoast extends Document {
  name: string;
  profileImage: string;
  checkedBadge: string;
  tag: string[];
  imageUrl: string;
  title: string;
  content: string;
  shareStatus: boolean;
  likeIds: string[];
  createdAt: Date;
  diaryId: string;
}

const BoastSchema = new Schema<IBoast>({
  name: {
    type: String,
    // required: true,
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
  imageUrl: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
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
  shareStatus: {
    type: Boolean,
  },
  likeIds: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
  diaryId: {
    type: String,
    required: true,
  },
});

export default model<IBoast>("Boast", BoastSchema);
