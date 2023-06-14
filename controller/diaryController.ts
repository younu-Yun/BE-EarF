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
      const { id } = req.user as IUser;
      const allDiariesByMonth = await diaryService.getAllDiariesByMonth(
        id,
        month
      );
      sendResponse(res, 200, "Success", allDiariesByMonth);
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  },
  async getAllDiariesTagByMonth(req: Request, res: Response) {
    try {
      const { month } = req.params;
      const { id } = req.user as IUser;
      const allDiariesTagByMonth = await diaryService.getAllDiariesTagByMonth(
        id,
        month
      );
      sendResponse(res, 200, "Success", allDiariesTagByMonth);
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  },
  async createDiary(req: Request, res: Response) {
    try {
      const { tag, title, content, shareStatus, likeIds } = req.body;
      const { date } = req.params;
      const { id, name, profileImage, checkedBadge } = req.user as IUser;
      const imageUrl = (process.env.IMAGEDOMAIN as Path) + req.file?.filename;
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
        imageUrl
      );
      sendResponse(res, 200, "Diary created", createDiary);
    } catch (error: any) {
      console.log(error);
      sendResponse(res, 500, error.message);
    }
  },
  async updateDiary(req: Request, res: Response) {
    try {
      const { tag, title, content, shareStatus, likeIds } = req.body;
      const { date } = req.params;
      const { id, name, profileImage, checkedBadge } = req.user as IUser;
      const imageUrl = (process.env.IMAGEDOMAIN as Path) + req.file?.filename;
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
        imageUrl
      );
      sendResponse(res, 200, "Diary updated", updatedDiary);
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  },
  async deleteDiary(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const { id } = req.user as IUser;
      const deletedDiary = await diaryService.deleteDiary(
        id,
        new Date(date as string)
      );
      sendResponse(res, 200, "Diary deleted", deletedDiary);
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  },
  async getDiary(req: Request, res: Response) {
    try {
      const { date } = req.params;
      const { id } = req.user as IUser;
      const getDiary = await diaryService.getDiary(
        id,
        new Date(date as string)
      );
      sendResponse(res, 200, "Success", getDiary);
    } catch (error: any) {
      sendResponse(res, 500, error.message);
    }
  },
};

export default diaryController;
