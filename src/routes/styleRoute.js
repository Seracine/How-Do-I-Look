import express from 'express';
import styleController from '../controllers/styleController.js';
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
    .post(validateBody(styleFormInputSchema), styleController.postStyle)
    .get(validateQuery(stylesQuerySchema), styleController.getStyleList);

styleRouter.route('/:styleId')
    .put(
        validateParams(['styleId']),
        validateBody(styleUpdateFormInputSchema),
        styleController.putStyle
    )
    .delete(
        validateParams(['styleId']),
        validateBody(styleDeleteFormInputSchema),
        styleController.deleteStyle
    )
    .get(
        validateParams(['styleId']),
        styleController.getStyle
    );

export default styleRouter;