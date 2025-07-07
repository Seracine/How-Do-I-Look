import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRouter from './src/routes/uploadRoute.js';
import styleRouter from './src/routes/styleRoute.js';
import curationRouter from './src/routes/curationRoute.js';
import commentRouter from './src/routes/commentRoute.js';

dotenv.config()

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); //CORS 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// URL-encoded 본문 파싱 미들웨어 (폼 데이터 받을 때 필요)

app.use('/images', uploadRouter);//이미지 업로드 라우터 설정
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));//저장된 이미지 사용을 위한 설정
app.use('/styles', styleRouter); // 스타일 라우터 설정
app.use('/curations', curationRouter); // Curation 라우터 설정
app.use('/styles/:styleId/curations', curationRouter); // Curation 라우터를 스타일 라우터에 중첩
app.use('/curations/:curationId/comments', commentRouter); // 답글 라우터 설정

app.listen(process.env.PORT || 3000, () => console.log("Server Starting..."));