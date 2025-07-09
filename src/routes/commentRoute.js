import express from 'express';
import {
  validateBody,
  validateParams,
  commentFormInputSchema,
  commentUpdateFormInputSchema,
  commentDeleteFormInputSchema
} from '../middlewares/validationMiddleware.js';
import CommentController from '../controllers/commentController.js';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.route('/')
  // 답글 생성
  .post(validateBody(commentFormInputSchema),
    validateParams(['curationId']),
    CommentController.createComment);

commentRouter.route('/:commentId')
  // 답글 수정
  .put(validateBody(commentUpdateFormInputSchema),
    validateParams(['commentId']),
    CommentController.updateComment)
  // 답글 삭제
  .delete(validateBody(commentDeleteFormInputSchema),
    validateParams(['commentId']),
    CommentController.deleteComment);

export default commentRouter;