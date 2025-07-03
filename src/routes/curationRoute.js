import express from 'express';
// import { validateBody, curatingFormInputSchema } from '../middlewares/validationMiddleware.js';
import curationControllers from '../controllers/curationControllers.js';

const curationRouter = express.Router({ mergeParams: true });

curationRouter.route('/')
    // Curation 생성
    .post(curationControllers.createCuration)
    // .post(validate(curationControllers.createCuration), curationControllers.createCuration)
    // Curation 목록 조회
    .get(curationControllers.getCurationList);

curationRouter.route('/:curationId')
    // Curation 수정
    .patch(curationControllers.updateCuration)
    // Curation 삭제
    .delete(curationControllers.deleteCuration);

export default curationRouter;