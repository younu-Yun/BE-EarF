import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  id?: string;
  password?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
  badges?: [];
  postNum?: number;
  tumblerNum?: number;
  transportNum?: number;
  basketNum?: number;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    badges: [
      {
        type: Schema.Types.ObjectId,
        ref: "Badge",
      },
    ],
    postNum: {
      // 3회 이상 연속작성, 커뮤니티 포스팅 10회
      type: Number,
      default: 0,
    },
    tumblerNum: {
      // 텀블러 3회 사용
      type: Number,
      default: 0,
    },
    transportNum: {
      // 대중교통 이용 3회
      type: Number,
      default: 0,
    },
    basketNum: {
      // 장바구니 3회 사용
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // 최초작성, 3회 이상 연속작성
);

export default model<IUser>("User", UserSchema);
