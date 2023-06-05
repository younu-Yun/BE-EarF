import { Schema, Document, Model, model } from 'mongoose';

interface ITodo extends Document {
  userId: Schema.Types.ObjectId;
  todo: String[];
  date: Date;
  completed: Boolean[];
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema: Schema<ITodo> = new Schema<ITodo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    completed: {
      type: [Boolean],
      required: true,
    }
  },
  { timestamps: true }
)

const Todo: Model<ITodo> = model<ITodo>('Todo', todoSchema);

export { ITodo, Todo };