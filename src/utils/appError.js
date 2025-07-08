export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    // 디버깅을 위한 스택 트레이스 생성
    // 스택에서 현재 클래스의 생성자를 제외
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = '존재하지 않습니다') {
    super(message, 404);   
  }
}

export class ValidationError extends AppError {
  constructor(message = '잘못된 요청입니다') {
    super(message, 400);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = '비밀번호가 틀렸습니다') {
    super(message, 403);
  }
}