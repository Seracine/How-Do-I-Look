import express from 'express'
import rankingController from '../controllers/rankingController.js'

const rankingRouter = express.Router()

rankingRouter.route('/')
    .get(rankingController.getRankedStyleList)

export default rankingRouter;