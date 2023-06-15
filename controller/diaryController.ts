import { Request, Response } from "express";
import diaryService from "../services/diaryService";
import { IUser } from "../models";
import dotenv from "dotenv";
import { Path } from "typescript";
import sendResponse from "../utils/sendResponse";
dotenv.config();

const diaryController = {
  async getAllDiariesByMonth(req: Request, res: Response) {
    try {
      const { month } = req.params;
      const { _id } = req.user as IUser;
      const allDiariesByMonth = await diaryService.getAllDiariesByMonth(
        _id,
        month
      );
      res.status(200).json(allDiariesByMonth);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getAllDiariesTagByMonth(req: Request, res: Response) {
    try {
      const { month } = req.params;
      const { _id } = req.user as IUser;
      const allDiariesTagByMonth = await diaryService.getAllDiariesTagByMonth(
        _id,
        month
      );
      res.status(200).json(allDiariesTagByMonth)
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async createDiary(req: Request, res: Response) {
    try {
      const { tag, title, content, shareStatus, likeIds } = req.body;
      const { date } = req.params;
      const { _id, name, profileImage, checkedBadge } = req.user as IUser;
      const imageUrl = (process.env.IMAGEDOMAIN as Path) + req.file?.filename;
      const createDiary = await diaryService.createDiary(
        _id,
        name,
        profileImage,
        checkedBadge,
        new Date(date as string),
        tag,
        title,
        content,
        shareStatus,
        likeIds,
        imageUrl
      );
      res.status(200).json(createDiary);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
  async updateDiary(req: Request, res: Response) {
    try {
      const { tag, title, content, shareStatus, likeIds } = req.body;
      const { date } = req.params;
      const { _id, name, profileImage, checkedBadge } = req.user as IUser;
      const imageUrl = (process.env.IMAGEDOMAIN as Path) + req.file?.filename;
      const updatedDiary = await diaryService.updateDiary(
        _id,
        name,
        profileImage,
        checkedBadge,
        new Date(date as string),
        tag,
        title,
        content,
        shareStatus,
        likeIds,
        imageUrl
      );
      res.status(200).json(updatedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async deleteDiary(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const { _id } = req.user as IUser;
      const deletedDiary = await diaryService.deleteDiary(
        _id,
        new Date(date as string)
      );
      res.status(200).json(deletedDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
  async getDiary(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const { _id } = req.user as IUser;
      const getDiary = await diaryService.getDiary(
        _id,
        new Date(date as string)
      );
      res.status(200).json(getDiary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default diaryController;
