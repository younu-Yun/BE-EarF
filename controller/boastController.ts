import { Request, Response } from "express";
import boastService from "../services/boastService";
import { IBoast } from "../models/schemas/boast";

const BoastController = {
  // 자랑하기 게시글 불러오기
  async loadBoast(req: Request, res: Response) {
    try {
      const boasts: IBoast[] = await boastService.loadBoast();
      res.status(200).json(boasts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "자랑하기 게시글을 불러오는데 실패했습니다." });
      }
    }
  },
};

export default BoastController;
