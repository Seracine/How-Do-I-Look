import express from 'express';
import replyController from '../controllers/replyController.js';

const replyRouter = express.Router();

replyRouter.route('/')
  .post(
    replyController.createReply
  );
  
replyRouter.route('/:id')
  .put(replyController.updateReply);

export default replyRouter;

// hash는 유틸 함수로 빼기
