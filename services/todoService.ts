import { Todo } from '../models/schemas/todo';

const Error_Message = {
  createTodoError: '일정 생성에 실패했습니다.',
  updateTodoError: '일정 수정에 실패했습니다.',
  deleteTodoError: '일정 삭제에 실패했습니다.',
  getTodoError: '일정을 불러오는 데에 실패했습니다.',
};

const todoService = {
  //todo 추가
  async createTodo(date: Date, todoList: string[], completed: boolean[]) {
    try {
      const createTodoList = await Todo.create({ date, todoList, completed });
      return createTodoList;
    } catch (error) {
      throw new Error(Error_Message.createTodoError);
    }
  },
  //todo 완료
  async completeStatusUpdateTodo(date: Date, todoIndex: number) {
    try {
      const completeStatusUpdatedTodoList = await Todo.findOne({ date });
      if (completeStatusUpdatedTodoList) {
        completeStatusUpdatedTodoList.completed[todoIndex] = true;
        await completeStatusUpdatedTodoList.save();
      }
      return completeStatusUpdatedTodoList;
    } catch (error) {
      throw new Error(Error_Message.updateTodoError);
    }
  },
  //todo 삭제
  async deleteTodo(date: Date, todoIndex: number) {
    try {
      const deletedTodoList = await Todo.findOne({ date });
      if (deletedTodoList) {
        deletedTodoList.todoList.splice(todoIndex, 1);
        deletedTodoList.completed.splice(todoIndex, 1);
        await deletedTodoList.save();
      }
      return deletedTodoList;
    } catch (error) {
      throw new Error(Error_Message.deleteTodoError);
    }
  },
  //todo 조회
  async getTodo(date: Date) {
    try {
      const getTodo = await Todo.findOne({ date });
      return getTodo;
    } catch (error) {
      throw new Error(Error_Message.getTodoError);
    }
  },
};

export default todoService;