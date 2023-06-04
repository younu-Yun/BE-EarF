import { Request, Response } from 'express';
import todoService from '../services/todoService';

const todoController = {
  async createTodo(req: Request, res: Response) {
    try {
      const { date, todo } = req.body;
      const createTodoList = await todoService.createTodo(date, todo);
      res.status(200).json(createTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async completeTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { todoIndex, completed } = req.body;
      const updatedTodoList = await todoService.completeTodo(id, todoIndex, completed);
      res.status(200).json(updatedTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteTodo(req: Request, res: Response) {
    try {
      const { id, todoIndex } = req.params;
      const deletedTodoList = await todoService.deleteTodo(id, Number(todoIndex));
      res.status(200).json(deletedTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getTodo(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const getTodoList = await todoService.getTodo(new Date(date));
      res.status(200).json(getTodoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default todoController;
