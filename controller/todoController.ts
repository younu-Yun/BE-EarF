import { Request, Response } from 'express';
import todoService from '../services/todoService';

const todoController = {
  async createTodo(req: Request, res: Response) {
    try {
      const { date, todo } = req.body;
      const todoList = await todoService.createTodo(date, todo);
      res.status(200).json(todoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { todo } = req.body;
      const todoList = await todoService.updateTodo(id, todo);
      res.status(200).json(todoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteTodo(req: Request, res: Response) {
    try {
      const { id, index } = req.body;
      const todoList = await todoService.deleteTodo(id, index);
      res.status(200).json(todoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async readTodo(req: Request, res: Response) {
    try {
      const { date } = req.body;
      const todoList = await todoService.readTodo(date);
      res.status(200).json(todoList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default todoController;