import express from 'express'
import tagController from '../controllers/tagController.js'

const tagRouter = express.Router()

tagRouter.route('/')
    .get(tagController.getPopularTagList)

export default tagRouter;