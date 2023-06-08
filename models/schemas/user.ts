import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  id: string;
  password: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  badges: [];
  checkedBadge: string;
  postNum: number;
  tumblerNum: number;
  transportNum: number;
  basketNum: number;
  refreshToken: string;
  isTempPassword: boolean;
}

export interface IBadge extends Document {
  type: string;
  ThumbBadge: string;
}

// 뱃지 스키마 정의
const badgeSchema: Schema<IBadge> = new Schema<IBadge>({
  type: {
    type: String,
    required: true,
    enum: ["최초", "연속", "신규", "텀블", "교통", "버켓", "커뮤"],
  },
  ThumbBadge: {
    //대표이미지로 수정
    type: String,
    default: "신규",
  },
});

// 유저 스키마 정의
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
    badges: [badgeSchema],
    // 뱃지뿐만 아니라 캘린더에 현재까지 유저의 총 태그갯수를 조회하는 api가 필요할 것 같아서 남겨두려고 함.
    checkedBadge: {
      type: String,
      default: "신규",
    },
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
    refreshToken: {
      type: String,
      default: "",
    },
    isTempPassword: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // 최초작성, 3회 이상 연속작성
);

export default model<IUser>("User", UserSchema);
