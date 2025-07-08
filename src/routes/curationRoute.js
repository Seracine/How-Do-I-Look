import express from 'express';
import { 
    validateBody,
    validateParams,
    validateQuery, 
    curatingFormInputSchema, 
    curationsQuerySchema,
    curatingUpdateFormInputSchema,
    curatingDeleteFormInputSchema
} from '../middlewares/validationMiddleware.js';
import curationControllers from '../controllers/curationControllers.js';

const curationRouter = express.Router({ mergeParams: true });

curationRouter.route('/')
    // Curation 생성
    .post(validateBody(curatingFormInputSchema),
    validateParams(['styleId']), 
    curationControllers.createCuration)
    // Curation 목록 조회
    .get(validateQuery(curationsQuerySchema),
    validateParams(['styleId']), 
    curationControllers.getCurationList);

curationRouter.route('/:curationId')
    // Curation 수정
    .put(validateBody(curatingUpdateFormInputSchema),
    validateParams(['curationId']),
    curationControllers.updateCuration)
    // Curation 삭제
    .delete(validateBody(curatingDeleteFormInputSchema),
        validateParams(['curationId']),
    curationControllers.deleteCuration);

export default curationRouter;