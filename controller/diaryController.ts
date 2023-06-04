import { Request, Response } from 'express';
import diaryService from '../services/diaryService';

const diaryController = {
  async createDiary(req: Request, res: Response) {
    try {
      const { userId, tag, imageUrl, title, content } = req.body;
      const createDiary = await diaryService.createDiary(userId, tag, imageUrl, title, content);
      res.status(200).json(createDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateDiary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const updatedDiary = await diaryService.updateDiary(id, title, content);
      res.json(updatedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteDiary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedDiary = await diaryService.deleteDiary(id);
      res.json(deletedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getDiary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const getDiary = await diaryService.getDiary(id);
      res.json(getDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default diaryController;