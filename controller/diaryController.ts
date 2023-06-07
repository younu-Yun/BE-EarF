import { Request, Response } from 'express';
import diaryService from '../services/diaryService';

const diaryController = {
  async getAllDiariesByMonth(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { startDate, endDate } = req.query;
      //const userId = req.user.id;
      const allDiariesByMonth = await diaryService.getAllDiariesByMonth(
        userId,
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
        userId,
        tag,
        imageUrl,
        title,
        content,
        shareStatus
      } = req.body;
      const { date } = req.params;
      //const userId = req.user.id;
      const createDiary = await diaryService.createDiary(
        userId,
        new Date(date as string),
        tag,
        imageUrl,
        title,
        content,
        shareStatus);
      res.status(200).json(createDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateDiary(req: Request, res: Response) {
    try {
      const {
        userId,
        tag,
        imageUrl,
        title,
        content,
        shareStatus
      } = req.body;
      const { date } = req.params;
      //const userId = req.user.id;
      const updatedDiary = await diaryService.updateDiary(
        userId,
        new Date(date as string),
        tag,
        imageUrl,
        title,
        content,
        shareStatus);
      res.json(updatedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteDiary(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { date } = req.params;
      //const userId = req.user.id;
      const deletedDiary = await diaryService.deleteDiary(userId, new Date(date as string));
      res.json(deletedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getDiary(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { date } = req.params;
      //const userId = req.user.id;
      const getDiary = await diaryService.getDiary(userId, new Date(date as string));
      res.json(getDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default diaryController;