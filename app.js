import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors()); //CORS 설정
app.use(express.json());

app.listen(process.env.PORT || 3000, () => console.log("Server Starting..."));