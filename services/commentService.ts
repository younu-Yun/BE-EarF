import { Types } from "mongoose";
import Comment from "../models/schemas/comment";
import Question from "../models/schemas/question";

const CommentService = {
  // 커뮤니티 댓글 생성
  async createComment(
    postId: Types.ObjectId,
    id: string,
    name: string,
    profileImage: string,
    checkedBadge: string,
    comment: string,
  ) {
    try {
      const newComment = new Comment({
        postId,
        id,
        name,
        profileImage,
        checkedBadge,
        comment,
      });
      await newComment.save();

      // 게시글의 commentIds 배열에 새로운 댓글의 ID를 추가합니다.
      const post = await Question.findById(postId);
      if (!post) {
        throw new Error("게시글을 찾을 수 없습니다.");
      }
      post.commentIds.push(newComment._id);
      await post.save();

      return newComment; // 새로운 댓글의 ID를 반환
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
      // 댓글 찾기.
      const comment = await Comment.findById(id);
      if (!comment) {
        throw new Error("커뮤니티 댓글을 찾을 수 없습니다.");
      }

      // 댓글이 있는 게시글 찾기.
      const post = await Question.findById(comment.postId);
      if (!post) {
        throw new Error("게시글을 찾을 수 없습니다.");
      }

      // commentIds 배열에서 댓글 ID 삭제.
      post.commentIds = post.commentIds.filter(
        commentId => commentId.toString() !== id.toString(),
      );
      await post.save();

      // 댓글 자체 삭제.
      await Comment.findByIdAndDelete(id);

      return "댓글이 정상적으로 삭제되었습니다.";
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