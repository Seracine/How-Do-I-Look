import express from 'express';
import { validationReply } from './middlewares/validation';
import { hashPassword } from './middlewares/hashpassword';
import { addReply } from './controllers';

const createReplyRules = express.Router();
const updateReplyRules = express.Router();
const deleteReplyRules = express.Router();

createReplyRules.post(
  '/comments/:commentId/replies', 
  validationReply,  // 1. 입력값 검증, 정규화
  hashPassword,     // 2. 비밀번호 해시
  addReply          // 3. 컨트롤러
);

updateReplyRules.patch(

);

deleteReplyRules.delete(

);


export { replyRouter, updateReplyRules, deleteReplyRules } ; replyRouter

// hash는 유틸 함수로 빼기
