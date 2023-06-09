import { Types } from "mongoose";
import { Request, Response } from "express";
import CommentService from "../services/commentService";
import { IUser } from "../models";

const CommentController = {
  // 새로운 댓글 생성
  async createComment(req: Request, res: Response) {
    try {
      const { id, name, profileImage, checkedBadge } = req.user as IUser;
      console.log(req.user);
      const { postId } = req.params;
      const { comment } = req.body;
      const newComment = await CommentService.createComment(
        postId,
        id,
        name,
        profileImage,
        checkedBadge,
        comment,
      );
      res.status(201).json(newComment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  // 댓글 수정
  async updateComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "유효하지 않은 ID입니다." });
        return;
      }
      const _id = new Types.ObjectId(id);
      const { comment } = req.body;
      const updatedComment = await CommentService.updateComment(_id, comment);
      res.json(updatedComment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  // 댓글 삭제
  async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "유효하지 않은 ID입니다." });
        return;
      }
      const _id = new Types.ObjectId(id);
      const deletedComment = await CommentService.deleteComment(_id);
      res.json(deletedComment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  // 특정 댓글 조회
  async readComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "유효하지 않은 ID입니다." });
        return;
      }
      const _id = new Types.ObjectId(id);
      const comment = await CommentService.readComment(_id);
      res.json(comment);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  // 특정 게시글의 모든 댓글 조회
  async readAllCommentsOfPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      if (!Types.ObjectId.isValid(postId)) {
        res.status(400).json({ error: "유효하지 않은 게시글 ID입니다." });
        return;
      }
      const _postId = new Types.ObjectId(postId);
      const comments = await CommentService.readAllCommentsOfPost(_postId);
      res.json(comments);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },
};

export default CommentController;
