import { Schema, Document, Model, model } from 'mongoose';

interface ICalendar extends Document {
  tag: String[];
  imageUrl?: String;
  title: String;
  content: String;
  date: Date;
  todo: String[];
  createdAt: Date;
  updatedAt: Date;
}

const CalendarSchema: Schema<ICalendar> = new Schema<ICalendar>(
  {
    tag: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    todo: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
)

const Calendar: Model<ICalendar> = model<ICalendar>('Calendar', CalendarSchema);

export { ICalendar, Calendar };