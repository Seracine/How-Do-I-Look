import express from 'express'
import UploadController from '../controllers/uploadController.js'
import { uploadFile } from '../middlewares/uploadMiddleware.js'

const uploadRouter = express.Router()

uploadRouter.route('/')
  .post(uploadFile, UploadController.postImage)

export default uploadRouter;