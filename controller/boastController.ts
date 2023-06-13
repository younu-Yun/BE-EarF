import { Request, Response } from "express";
import boastService from "../services/boastService";
import { IUser } from "../models";

const BoastController = {
  // 단일 다이어리 게시글 불러오기
  async loadSingleDiary(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const diary = await boastService.loadSingleDiary(id as string);

      res.status(200).json(diary);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "다이어리 게시글을 불러오는데 실패했습니다." });
      }
    }
  },

  // 자랑하기 게시글 불러오기
  async loadBoast(req: Request, res: Response) {
    try {
      const diaries = await boastService.loadBoast();
      res.status(200).json(diaries);
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

  // 태그 이름으로 게시글 불러오기
  async searchByTag(req: Request, res: Response) {
    try {
      let tags: string[] = [];
      const queryTags = req.query.tag;

      if (typeof queryTags === "string") {
        tags = [queryTags];
      } else if (Array.isArray(queryTags)) {
        tags = queryTags.map(tag => String(tag));
      }

      const diaries = await boastService.searchByTag(tags);

      res.status(200).json(diaries);
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

  // 좋아요가 많은 상위 5개의 자랑하기 게시글 불러오기
  async loadTop5Boast(req: Request, res: Response) {
    try {
      const diaries = await boastService.loadTop5Boast();
      res.status(200).json(diaries);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({
          error:
            "좋아요가 많은 상위 5개의 자랑하기 게시글을 불러오는데 실패했습니다.",
        });
      }
    }
  },

  // 다이어리 게시글 좋아요 누르기 / 취소하기
  async toggleLike(req: Request, res: Response) {
    try {
      const { id: userId } = req.user as IUser;
      const { id: diaryId } = req.params;

      const diary = await boastService.toggleLike(diaryId, userId);

      res.status(200).json(diary);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({
          error: "다이어리 게시글 좋아요 기능 처리에 실패하였습니다.",
        });
      }
    }
  },
};

export default BoastController;
