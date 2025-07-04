import express from 'express';
import { hashPassword } from '../middlewares/replyHashpassword';
import replyControllers from '../controllers/replyControllers';

const createReplyRules = express.Router();
const updateReplyRules = express.Router();
const deleteReplyRules = express.Router();

createReplyRules.post(
  '/comments/:commentId/replies', 
  hashPassword,     // 2. 비밀번호 해시
  replyControllers          // 3. 컨트롤러
);

updateReplyRules.patch(

);

deleteReplyRules.delete(
  
);


export { replyRouter, updateReplyRules, deleteReplyRules } ; replyRouter

// hash는 유틸 함수로 빼기
