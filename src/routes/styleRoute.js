import express from 'express'
import styleController from '../controllers/styleController.js'

const styleRouter = express.Router()

styleRouter.route('/')
    .post(styleController.postStyle)
//  .post(validations.createStyleValidation, styleController.postStyle)  - 오류 처리 후
styleRouter.route('/:styleId')
    .put(styleController.putStyle)
    .delete(styleController.deleteStyle)
export default styleRouter;