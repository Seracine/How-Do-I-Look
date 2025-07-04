import express from 'express'
import uploadCotroller from '../controllers/uploadController.js'
import styleRouter from './styleRoute'

const uploadRouter = express.Router()

uploadRouter.route('/')
.post(uploadCotroller.postImage)

export default uploadRouter