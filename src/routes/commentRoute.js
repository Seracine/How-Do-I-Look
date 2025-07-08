import express from 'express';
import {
  validateBody,
  validateParams,
  commentFormInputSchema,
  commentUpdateFormInputSchema,
  commentDeleteFormInputSchema
} from '../middlewares/validationMiddleware.js';
import commentController from '../controllers/commentController.js';

const commentRouter = express.Router({ mergeParams: true });

commentRouter.route('/')
  // 답글 생성
  .post(validateBody(commentFormInputSchema),
    validateParams(['curationId']),
    commentController.createComment);

commentRouter.route('/:commentId')
  // 답글 수정
  .put(validateBody(commentUpdateFormInputSchema),
    validateParams(['commentId']),
    commentController.updateComment)
  // 답글 삭제
  .delete(validateBody(commentDeleteFormInputSchema),
    validateParams(['commentId']),
    commentController.deleteComment);

export default commentRouter;