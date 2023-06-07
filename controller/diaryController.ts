import { Request, Response } from 'express';
import diaryService from '../services/diaryService';

const diaryController = {
  async getAllDiariesByMonth(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      //const userId = req.user.id;
      const allDiariesByMonth = await diaryService.getAllDiariesByMonth(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(allDiariesByMonth);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async createDiary(req: Request, res: Response) {
    try {
      const {
        date,
        tag,
        imageUrl,
        title,
        content,
        shareStatus
      } = req.body;
      //const userId = req.user.id;
      const createDiary = await diaryService.createDiary(date, tag, imageUrl, title, content, shareStatus);
      res.status(200).json(createDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateDiary(req: Request, res: Response) {
    try {
      const {
        date,
        tag,
        imageUrl,
        title,
        content,
        shareStatus
      } = req.body;
      //const userId = req.user.id;
      const updatedDiary = await diaryService.updateDiary(date, tag, imageUrl, title, content, shareStatus);
      res.json(updatedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteDiary(req: Request, res: Response) {
    try {
      const { date } = req.body;
      //const userId = req.user.id;
      const deletedDiary = await diaryService.deleteDiary(date);
      res.json(deletedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getDiary(req: Request, res: Response) {
    try {
      const { date } = req.body;
      //const userId = req.user.id;
      const getDiary = await diaryService.getDiary(date);
      res.json(getDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default diaryController;