import { Types } from "mongoose";
import Comment from "../models/schemas/comment";

const CommentService = {
  // 커뮤니티 댓글 생성
  // 커뮤니티 댓글 생성
  async createComment(
    postId: Types.ObjectId,
    userId: Types.ObjectId,
    comment: string,
  ) {
    try {
      const newComment = new Comment({
        postId,
        userId,
        comment,
      });
      await newComment.save();
      return newComment._id; // 새로운 댓글의 ID를 반환
    } catch (error) {
      console.error(error);
      throw new Error("커뮤니티 댓글 생성에 실패하였습니다.");
    }
  },

  // 커뮤니티 댓글 수정
  async updateComment(id: Types.ObjectId, comment: string) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { comment },
        { new: true, useFindAndModify: false },
      );
      if (!updatedComment) {
        throw new Error("커뮤니티 댓글을 찾을 수 없습니다.");
      }
      return updatedComment;
    } catch (error) {
      console.error(error);
      throw new Error("커뮤니티 댓글 수정에 실패하였습니다.");
    }
  },

  // 커뮤니티 댓글 삭제
  async deleteComment(id: Types.ObjectId) {
    try {
      const deletedComment = await Comment.findByIdAndDelete(id);
      if (!deletedComment) {
        throw new Error("커뮤니티 댓글을 찾을 수 없습니다.");
      }
      return deletedComment;
    } catch (error) {
      console.error(error);
      throw new Error("커뮤니티 댓글 삭제에 실패하였습니다.");
    }
  },

  // 커뮤니티 댓글 조회
  async readComment(id: Types.ObjectId) {
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new Error("커뮤니티 댓글을 찾을 수 없습니다.");
      }
      return comment;
    } catch (error) {
      console.error(error);
      throw new Error("커뮤니티 댓글 조회에 실패하였습니다.");
    }
  },

  // 특정 커뮤니티 게시글의 모든 댓글 조회
  async readAllCommentsOfPost(postId: Types.ObjectId) {
    try {
      const comments = await Comment.find({ postId });
      return comments;
    } catch (error) {
      console.error(error);
      throw new Error("해당 게시글의 모든 댓글을 불러오는데 실패하였습니다.");
    }
  },
};

export default CommentService;
