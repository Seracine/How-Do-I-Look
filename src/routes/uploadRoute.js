import express from 'express'
import uploadController from '../controllers/uploadController.js'
import { uploadFile } from '../middlewares/uploadMiddleware.js'

const uploadRouter = express.Router()

uploadRouter.route('/')
  .post(uploadFile, uploadController.postImage)

export default uploadRouter;