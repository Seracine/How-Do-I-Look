import express from 'express';
import replyController from '../controllers/replyController.js';
/* import { hashPassword } from '../middlewares/replyHashpassword.js';
import replyControllers from '../controllers/replyControllers.js'; */

const replyRouter = express.Router();

replyRouter.route('/')
  .post(
    /*  hashPassword,     // 2. 비밀번호 해시
     replyControllers          // 3. 컨트롤러 */
    replyController.createReply
  );
  

export default replyRouter;

// hash는 유틸 함수로 빼기
