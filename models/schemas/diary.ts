import { Schema, Document, Model, model } from 'mongoose';
import User, { IUser } from '../schemas/user';

interface IDiary extends Document {
  id: IUser['id'];
  name: IUser['name'];
  profileImage: IUser['profileImage'];
  checkedBadge: IUser['checkedBadge'];
  tag: string[];
  imageUrl: string;
  title: string;
  content: string;
  date: Date;
  shareStatus: boolean;
  likeIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const diarySchema: Schema<IDiary> = new Schema<IDiary>(
  {
    id: {
      type: String,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    checkedBadge: {
      type: String,
      default: "신규",
      enum: ["최초", "연속", "신규", "텀블", "교통", "버켓", "커뮤"],
    },
    tag: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
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
      required: true,
      default: false,
    },
    likeIds: {
      type: [String],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

const Diary: Model<IDiary> = model<IDiary>('Diary', diarySchema);

export { IDiary, Diary };