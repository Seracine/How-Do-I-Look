import express from 'express';
import commentController from '../controllers/commentController.js';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.route('/')
  // 답글 생성
  .post(commentController.createComment)
  
commentRouter.route('/:commentId')
  // 답글 수정
  .put(commentController.updateComment)
  // 답글 삭제
  .delete(commentController.deleteComment);

export default commentRouter;
