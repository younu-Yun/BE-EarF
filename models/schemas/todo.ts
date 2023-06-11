import { Schema, Document, Model, model } from 'mongoose';
import User, { IUser } from '../schemas/user';

interface ITodo extends Document {
  id: IUser['id'];
  date: Date;
  todoList: String[];
  completed: Boolean[];
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema: Schema<ITodo> = new Schema<ITodo>(
  {
    id: {
      type: String,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true,
    },
    todoList: {
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