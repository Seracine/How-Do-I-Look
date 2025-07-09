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
import CurationController from '../controllers/curationControllers.js';

const curationRouter = express.Router({ mergeParams: true });

curationRouter.route('/')
    // Curation 생성
    .post(validateBody(curatingFormInputSchema),
        validateParams(['styleId']),
        CurationController.createCuration)
    // Curation 목록 조회
    .get(validateQuery(curationsQuerySchema),
        validateParams(['styleId']),
        CurationController.getCurationList);

curationRouter.route('/:curationId')
    // Curation 수정
    .put(validateBody(curatingUpdateFormInputSchema),
        validateParams(['curationId']),
        CurationController.updateCuration)
    // Curation 삭제
    .delete(validateBody(curatingDeleteFormInputSchema),
        validateParams(['curationId']),
        CurationController.deleteCuration);

export default curationRouter;