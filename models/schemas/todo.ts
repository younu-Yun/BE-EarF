import { Schema, Document, Model, model } from 'mongoose';

interface ITodo extends Document {
  date: Date;
  todoList: String[];
  completed: Boolean[];
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema: Schema<ITodo> = new Schema<ITodo>(
  {
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