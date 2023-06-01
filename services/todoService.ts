import { Calendar } from '../models/schemas/calendar';

const todoService = {
  //todo 생성
  async createTodo(date: Date, todo: string[]) {
    try {
      const todoList = await Calendar.create({ date, todo });
      return todoList;
    } catch (error) {
      throw new Error('일정 생성에 실패했습니다.');
    }
  },
  //todo 수정
  async updateTodo(id: string, todo: string[]) {
    try {
      const todoList = await Calendar.findOneAndUpdate(
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
      const todoList = await Calendar.findOne({ _id: id });
      if (todoList !== null) {
        todoList.todo.splice(index, 1);
        todoList.save();
      }
      return todoList;
    } catch (error) {
      throw new Error('일정 삭제에 실패했습니다.');
    }
  },
  //todo 조회
  async readTodo(date: Date) {
    try {
      const todoList = await Calendar.find({ date });
      return todoList;
    } catch (error) {
      throw new Error('일정을 불러올 수 없습니다.');
    }
  },
}

export default todoService;