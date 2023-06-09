import { Request, Response } from 'express';
import diaryService from '../services/diaryService';
import { IUser } from '../models';

const diaryController = {
  async getAllDiariesByMonth(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;
      const { _id } = req.user as IUser;
      const allDiariesByMonth = await diaryService.getAllDiariesByMonth(
        _id,
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
        tag,
        title,
        content,
        shareStatus
      } = req.body;
      const { date } = req.params;
      const { _id } = req.user as IUser;
      const createDiary = await diaryService.createDiary(
        _id,
        new Date(date as string),
        tag,
        title,
        content,
        shareStatus);
      res.status(200).json(createDiary);
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  },
  async photoRegisterInDiary(req: Request, res: Response) {
    try {
      const { image } = req.body;
      const { date } = req.params;
      const { _id } = req.user as IUser;
      const photoRegisterInDiary = await diaryService.photoRegisterInDiary(_id, new Date(date as string), image);
      res.status(200).json(photoRegisterInDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async updateDiary(req: Request, res: Response) {
    try {
      const {
        tag,
        title,
        content,
        shareStatus
      } = req.body;
      const { date } = req.params;
      const { _id } = req.user as IUser;
      const updatedDiary = await diaryService.updateDiary(
        _id,
        new Date(date as string),
        tag,
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
      const { date } = req.params;
      const { _id } = req.user as IUser;
      const deletedDiary = await diaryService.deleteDiary(_id, new Date(date as string));
      res.json(deletedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getDiary(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const { _id } = req.user as IUser;
      const getDiary = await diaryService.getDiary(_id, new Date(date as string));
      res.json(getDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default diaryController;