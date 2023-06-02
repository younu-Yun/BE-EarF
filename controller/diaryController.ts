import { Request, Response } from 'express';
import diaryService from '../services/diaryService';

const diaryController = {
  async createDiary(req: Request, res: Response) {
    try {
      const { userId, tag, imageUrl, title, content } = req.body;
      const diary = await diaryService.createDiary(userId, tag, imageUrl, title, content);
      res.status(200).json(diary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateDiary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const diary = await diaryService.updateDiary(id, title, content);
      res.json(diary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteDiary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const diary = await diaryService.deleteDiary(id);
      res.json(diary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async readDiary(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const diary = await diaryService.readDiary(id);
      res.json(diary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default diaryController;