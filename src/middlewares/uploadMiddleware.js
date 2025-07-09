import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// 현재 파일의 URL 경로를 파일 시스템 경로로 변환하는 부분
const __filename = fileURLToPath(import.meta.url);

// 변환된 파일 시스템 경로에서 디렉토리 이름만 추출하는 부분
const __dirname = path.dirname(__filename);

// uploads 디렉터리 경로를 정의합니다.
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

// 'uploads' 디렉터리가 없으면 생성합니다.
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`'uploads' directory created at: ${uploadsDir}`);
}

// 멀터로 다운로드할 저장소를 지정하는 부분
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// 저장할 파일의 제한을 거는 부분
const uploadLimits = {
  fileSize: 5 * 1024 * 1024 // 5MB (바이트 단위)
};

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('허용되지 않는 파일 형식입니다. 지원되는 형식: ' + allowedExtensions.join(', ')), false);
  }
};

export const uploadFile = multer({
  storage: storage,
  limits: uploadLimits,
  fileFilter,
}).single('image');