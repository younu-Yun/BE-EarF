import { Todo } from '../models/schemas/todo';

const todoService = {
  //todo 생성
  async createTodo(createdAt: Date, todo: string[]) {
    try {
      const todoList = await Todo.create({ createdAt, todo });
      return todoList;
    } catch (error) {
      throw new Error('일정 생성에 실패했습니다.');
    }
  },
  //todo 수정
  async updateTodo(id: string, todo: string[]) {
    try {
      const todoList = await Todo.findOneAndUpdate(
          { _id: id }, { todo }, { new: true }
        );
      return todoList;
    } catch (error) {
      throw new Error('일정 수정에 실패했습니다.');
    }
  },
  //todo 삭제
  async deleteTodo(id: string, index: number) {
    try {
      const todoList = await Todo.findOne({ _id: id });
      if (todoList !== null) {
        todoList.todo.splice(index, 1);
        await todoList.save();
      }
      return todoList;
    } catch (error) {
      throw new Error('일정 삭제에 실패했습니다.');
    }
  },
  //todo 조회
  async readTodo(createdAt: Date) {
    try {
      const todoList = await Todo.find({ createdAt });
      return todoList;
    } catch (error) {
      throw new Error('일정을 불러올 수 없습니다.');
    }
  },
}

export default todoService;