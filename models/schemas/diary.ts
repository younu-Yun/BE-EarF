import { Schema, Document, Model, model } from 'mongoose';
import User, { IUser } from '../schemas/user';

interface IDiary extends Document {
  id: IUser['id'];
  tag: string[];
  imageUrl: string;
  title: string;
  date: Date;
  shareStatus: boolean;
  content: string;
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
    date: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

const Diary: Model<IDiary> = model<IDiary>('Diary', diarySchema);

export { IDiary, Diary };