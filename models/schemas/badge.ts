import { Schema, Document } from "mongoose";

interface IBadge extends Document {
  name: string;
  imageStatus: boolean;
}

// 뱃지 스키마 정의
const badgeSchema: Schema<IBadge> = new Schema<IBadge>({
  name: {
    type: String,
    required: true,
  },
  imageStatus: {
    type: Boolean,
    default: false,
  },
});

export default badgeSchema;
