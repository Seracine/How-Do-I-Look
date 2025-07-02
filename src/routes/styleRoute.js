import express from 'express';
import curationRouter from './curationRoute.js'; // Curation 라우터를 임포트하여 중첩

const styleRouter = express.Router();


// Curation 라우터를 스타일 라우터에 중첩
styleRouter.use('/:styleId/curations', curationRouter);

export default styleRouter;