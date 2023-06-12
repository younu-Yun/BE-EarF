import { Request, Response } from 'express';
import diaryService from '../services/diaryService';
import { IUser } from '../models';

const Domain = 'http://34.64.216.86:4725/';

const diaryController = {
  async getAllDiariesByMonth(req: Request, res: Response) {
    try {
      const { month } = req.params;
      const { id } = req.user as IUser;
      const allDiariesByMonth = await diaryService.getAllDiariesByMonth(
        id,
        month,
      );
      res.status(200).json(allDiariesByMonth);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async createDiary(req: Request, res: Response) {
    try {
      const {
        tag,
        title,
        content,
        shareStatus,
        likeIds
      } = req.body;
      const { date } = req.params;
      const { id, name, profileImage, checkedBadge } = req.user as IUser;
      const imageUrl = Domain + req.file?.filename;;
      const createDiary = await diaryService.createDiary(
        id,
        name,
        profileImage,
        checkedBadge,
        new Date(date as string),
        tag,
        title,
        content,
        shareStatus,
        likeIds,
        imageUrl);
      res.status(200).json(createDiary);
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  },
  async updateDiary(req: Request, res: Response) {
    try {
      const {
        tag,
        title,
        content,
        shareStatus,
        likeIds
      } = req.body;
      const { date } = req.params;
      const { id, name, profileImage, checkedBadge } = req.user as IUser;
      const imageUrl = Domain + req.file?.filename;
      const updatedDiary = await diaryService.updateDiary(
        id,
        name,
        profileImage,
        checkedBadge,
        new Date(date as string),
        tag,
        title,
        content,
        shareStatus,
        likeIds,
        imageUrl);
      res.json(updatedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteDiary(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const { id } = req.user as IUser;
      const deletedDiary = await diaryService.deleteDiary(id, new Date(date as string));
      res.json(deletedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getDiary(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const { id } = req.user as IUser;
      const getDiary = await diaryService.getDiary(id, new Date(date as string));
      res.json(getDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default diaryController;