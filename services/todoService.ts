import { Todo } from '../models/schemas/todo';

interface CreateTodo {
  (
    id: string,
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
  id,
  date,
  todoList,
  completed
) => {
  try {
    const existingTodoList = await Todo.findOne({ id, date });

    if (existingTodoList) {
      existingTodoList.todoList = existingTodoList.todoList.concat(todoList);
      existingTodoList.completed.push(false);
      await existingTodoList.save();
      return existingTodoList;
    }
    const createTodoList = await Todo.create({
      id,
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
  async completeStatusUpdateTodo(id: string, date: Date, todoIndex: number) {
    try {
      const completeStatusUpdatedTodoList = await Todo.findOne({ id, date });
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
  async deleteTodo(id: string, date: Date, todoIndex: number) {
    try {
      const deletedTodoList = await Todo.findOne({ id, date });
  
      if (deletedTodoList) {
        deletedTodoList.todoList.splice(todoIndex, 1);
        deletedTodoList.completed.splice(todoIndex, 1);
        await deletedTodoList.save();
        if (deletedTodoList.todoList.length === 0) {
          await Todo.deleteOne({ id, date });
        }
      }
      return deletedTodoList;
    } catch (error) {
      throw new Error(Error_Message.deleteTodoError);
    }
  },
  //todo 조회
  async getTodo(id: string, date: Date) {
    try {
      const getTodo = await Todo.findOne({ id, date });
      return getTodo;
    } catch (error) {
      throw new Error(Error_Message.getTodoError);
    }
  },
};

export default todoService;