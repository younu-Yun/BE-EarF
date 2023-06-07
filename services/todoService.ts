import { Todo } from '../models/schemas/todo';

interface CreateTodo {
  (
    userId: string,
    date: Date,
    todoList: string[],
    completed: boolean[]
  ): Promise<any>;
}

const Error_Message = {
  createTodoError: '일정 생성에 실패했습니다.',
  updateTodoError: '일정 수정에 실패했습니다.',
  deleteTodoError: '일정 삭제에 실패했습니다.',
  getTodoError: '일정을 불러오는 데에 실패했습니다.',
};

const createTodo: CreateTodo = async (
  userId,
  date,
  todoList,
  completed
) => {
  try {
    const createTodoList = await Todo.create({
      userId,
      date,
      todoList,
      completed 
    });
    return createTodoList;
  } catch (error) {
    throw new Error(Error_Message.createTodoError);
  }
};

const todoService = {
  //todo 추가
  createTodo,
  //todo 완료
  async completeStatusUpdateTodo(userId: string, date: Date, todoIndex: number) {
    try {
      const completeStatusUpdatedTodoList = await Todo.findOne({ userId, date });
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
  async deleteTodo(userId: string, date: Date, todoIndex: number) {
    try {
      const deletedTodoList = await Todo.findOne({ userId, date });
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
  async getTodo(userId: string, date: Date) {
    try {
      const getTodo = await Todo.findOne({ userId, date });
      return getTodo;
    } catch (error) {
      throw new Error(Error_Message.getTodoError);
    }
  },
};

export default todoService;