import { Request, Response } from 'express';
import todoService from '../services/todoService';

const todoController = {
  async createTodo(req: Request, res: Response) {
    try {
      const { userId, todoList, completed } = req.body;
      const { date } = req.params;
      const createTodoList = await todoService.createTodo(
        userId,
        new Date(date as string),
        todoList,
        completed);
      res.status(200).json(createTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async completeStatusUpdateTodo(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { date, todoIndex } = req.params;
      const updatedTodoList = await todoService.completeStatusUpdateTodo(userId, new Date(date as string), Number(todoIndex));
      res.status(200).json(updatedTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteTodo(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { date, todoIndex } = req.params;
      const deletedTodoList = await todoService.deleteTodo(userId, new Date(date as string), Number(todoIndex));
      res.status(200).json(deletedTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getTodo(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { date } = req.params;
      const getTodoList = await todoService.getTodo(userId, new Date(date as string));
      res.status(200).json(getTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default todoController;
