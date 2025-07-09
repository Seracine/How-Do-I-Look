import express from 'express';
import StyleController from '../controllers/styleController.js';
import {
    validateBody,
    validateQuery,
    validateParams,
    styleFormInputSchema,
    styleUpdateFormInputSchema,
    styleDeleteFormInputSchema,
    stylesQuerySchema,
} from '../middlewares/validationMiddleware.js';

const styleRouter = express.Router();

styleRouter.route('/')
    .post(validateBody(styleFormInputSchema), StyleController.postStyle)
    .get(validateQuery(stylesQuerySchema), StyleController.getStyleList);

styleRouter.route('/:styleId')
    .put(
        validateParams(['styleId']),
        validateBody(styleUpdateFormInputSchema),
        StyleController.putStyle
    )
    .delete(
        validateParams(['styleId']),
        validateBody(styleDeleteFormInputSchema),
        StyleController.deleteStyle
    )
    .get(
        validateParams(['styleId']),
        StyleController.getStyle
    );

export default styleRouter;