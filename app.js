import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import styleRouter from './src/routes/styleRoute.js';
import curationRouter from './src/routes/curationRoute.js';
import replyRouter from './src/routes/replyRoute.js';

dotenv.config()

const app = express();

app.use(cors()); //CORS 설정
app.use(express.json());

app.use('/styles', styleRouter); // 스타일 라우터 설정
app.use('/curations', curationRouter); // Curation 라우터 설정
app.use('/styles/:styleId/curations', curationRouter); // Curation 라우터를 스타일 라우터에 중첩
app.use('/replys', replyRouter);

app.listen(process.env.PORT || 3000, () => console.log("Server Starting..."));