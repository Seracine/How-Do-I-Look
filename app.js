import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import errorHandlers from './src/errorhandlers/errorHandlers.js'; // 전역 에러 핸들러 임포트
import imageUpError from './src/errorhandlers/imageUpError.js';

dotenv.config()

// imageUpError 클래스의 인스턴스를 생성합니다.
// 클래스의 특정 기능을 미들웨어로 사용하려면, 클래스 인스턴스를 생성한 후, 
// 그 인스턴스가 가진 미들웨어 형태의 메서드를 app.use()에 전달해야 합니다.
const img = new imageUpError({ jwtSecret: 'mysecret' });

const app = express();

app.use(cors()); //CORS 설정
app.use(express.json());

app.use(img);
app.use(errorHandlers);

app.listen(process.env.PORT || 3000, () => console.log("Server Starting..."));