import { Todo } from '../models/schemas/todo';

const Error_Message = {
  createTodoError: '일정 생성에 실패했습니다.',
  updateTodoError: '일정 수정에 실패했습니다.',
  deleteTodoError: '일정 삭제에 실패했습니다.',
  getTodoError: '일정을 불러오는 데에 실패했습니다.',
};

const todoService = {
  //todo 생성
  async createTodo(date: Date, todo: string[]) {
    try {
      const completed = new Array(todo.length).fill(false);
      const addedTodoList = await Todo.create({ date, todo, completed });
      return addedTodoList;
    } catch (error) {
      throw new Error(Error_Message.createTodoError);
    }
  },
  //todo 완료
  async completeStatusUpdateTodo(id: string, todoIndex: number, completed: boolean) {
    try {
      const completeStatusUpdatedTodoList = await Todo.findById(id);
      if (completeStatusUpdatedTodoList) {
        completeStatusUpdatedTodoList.completed[todoIndex] = completed;
        await completeStatusUpdatedTodoList.save();
      }
      return completeStatusUpdatedTodoList;
    } catch (error) {
      throw new Error(Error_Message.updateTodoError);
    }
  },
  //todo 삭제
  async deleteTodo(id: string, todoIndex: number) {
    try {
      const deletedTodoList = await Todo.findById(id);
      if (deletedTodoList) {
        deletedTodoList.todo.splice(todoIndex, 1);
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