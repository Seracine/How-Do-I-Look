import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import errorHandlers from './src/errorhandlers/errorHandlers.js'; // 전역 에러 핸들러 임포트

dotenv.config()

const app = express();

app.use(cors()); //CORS 설정
app.use(express.json());


app.use(errorHandlers);

app.listen(process.env.PORT || 3000, () => console.log("Server Starting..."));