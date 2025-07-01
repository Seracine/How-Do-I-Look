/* src/
└── errors/
    ├── ApiError.js
    ├── ValidationError.js
    ├── NotFoundError.js
    ├── AuthenticationError.js
    ├── AuthorizationError.js
    ├── ImageUploadError.js
    ├── ServiceError.js
    ├── HashingError.js
    └── index.js // 모든 커스텀 에러를 여기서 export
*/
// 유효성 검사 미들웨어 에러핸들러는 준철님이 만드신다고 하심

import logger from '../utils/logger.js'; // 에러 로깅 유틸리티 (이전 예시에서 만듦)
import apiError from './apiError.js';

const errorHandlers = ( err, req, res, next ) => {
 // 1. 에러 로깅 (가장 중요!)
    logger.error(`Error: ${err.message}`, {
        statusCode: res.statusCode, // 에러의 상태 코드를 확인함
        message: err.message, // 에러 메세지에 관한 정보를 나타냄
        name: err.name, // 에러의 종류를 나타냄
        method: req.method, // http 요청에 관한 정보가 담겨 있음
        body: req.body, // http 본문에 담긴 데이터를 나타냄
        query: req.query, // URL 쿼리 문자열의 데이터를 가져옴
        stack: err.stack, // 에러가 어디서 발생했는지를 찾아줌

    });

  // 2. HTTP 상태 코드 및 클라이언트 응답 메시지 결정
    let statusCode = err.statusCode || 500; // 기본은 500 Internal Server Error
    let message = err.message || 'An unexpected internal server error occurred.';
    let errorDetails = null; // ValidationError 등의 상세 정보가 있을 경우

  // 모든 에러를 한 곳에서 받아서, 상황에 따라 응답을 표준화
  // 에러 로깅, 에러 유형별 분기 처리, 응답 포맷 통일

  // 에러 타입에 따른 세부 처리
    if (err instanceof apiError) {
        // ApiError 또는 이를 상속받은 커스텀 에러 (ValidationError, NotFoundError 등)인 경우
        statusCode = err.statusCode;
        message = err.message;
        if (err instanceof ValidationError) {
            errorDetails = err.details; // ValidationError의 details 속성 포함
        }
    } 
    
    else if (err.code === '등록 오류(에러 코드 수정바람)') {
        statusCode = 400;
        message = `잘못된 요청입니다.`;
    }
    
    else if (err.code === `목록 조회 오류(에러 코드 수정바람`) {
        statusCode = 400;
        message = `잘못된 요청입니다.`;
    }

    
    
     else if (err.code === 'LIMIT_FILE_SIZE') {
        throw new imageUpError(`파일 사이즈가 너무 큽니다. 5MB 이하의 파일을 업로드해주세요.`, 
            [`파일명: ${req.file.originalname}`]);
    }
     else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        statusCode = 400;
        message = '잘못된 파일이 업로드되었습니다.';
    }


    // 그 외 예상치 못한 프로그래밍 에러 (예: ReferenceError, TypeError 등)
    // 운영 환경에서는 사용자에게 상세한 에러 메시지를 노출하지 않도록 합니다.
    else {
        message = process.env.NODE_ENV === 'production'
            ? '예상치 못한 내부 서버 오류입니다. 다시 시도해주세요.'
            : err.message;
        // statusCode는 이미 500으로 초기화되어 있음
    } 

  // 3. 클라이언트에게 에러 응답 전송
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: message|| 'Internal Server Error',
        ...(errorDetails && Object.keys(errorDetails).length && { details: errorDetails }), 
        // 개발 환경에서만 스택 트레이스 포함 (디버깅 용이), 배포할때는 주석처리하기
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}

export default errorHandlers; // ES6 모듈 시스템을 사용하여 내보냅니다.

