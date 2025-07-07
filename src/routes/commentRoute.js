import express from 'express';
import commentController from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.route('/')
  .post(
    commentController.createComment
  );

commentRouter.route('/:id')
  .put(
    commentController.updateComment
  );

export default commentRouter;
