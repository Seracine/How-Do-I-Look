import express from 'express';
import { validationReply } from './middlewares/validation';
import { hashPassword } from './middlewares/hashpassword';
import { addReply } from './controllers';

const router = express.Router();

router.post(
  '/comments/:commentId/replies', 
  validationReply,  // 1. 입력값 검증, 정규화
  hashPassword,     // 2. 비밀번호 해시
  addReply          // 3. 컨트롤러
);

export default router;
