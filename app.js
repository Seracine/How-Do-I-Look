import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import curationRouter from './src/routes/curationRoute.js';
import styleRouter from './src/routes/styleRoute.js';

dotenv.config()

const app = express();

app.use(cors()); //CORS 설정
app.use(express.json());

app.use('/styles', styleRouter); // 스타일 라우터 설정
app.use('/curations', curationRouter); // Curation 라우터 설정

app.listen(process.env.PORT || 3000, () => console.log("Server Starting..."));