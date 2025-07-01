class apiError extends Error {
  constructor(message, statusCode = 500, errorCode = 'SERVER_ERROR') {
      super(message); // 부모 Error 클래스의 생성자 호출

      this.name = this.constructor.name; // 'ApiError' 또는 상속받은 클래스 이름 (예: 'NotFoundError')
      this.statusCode = statusCode;     // 클라이언트에게 보낼 HTTP 상태 코드 (예: 400, 401, 403, 404, 500)
      this.errorCode = errorCode;       // 내부적으로 사용될 고유 에러 코드 (선택 사항, 예: 'VALIDATION_FAILED')
      this.isOperational = true;        // 이 에러가 예측 가능하고, 운영 중에 발생할 수 있는 에러임을 나타냄

      // 스택 트레이스를 캡처하여 디버깅에 활용
      // 'this.constructor'는 스택 트레이스에서 이 생성자 호출 부분을 제외하여 더 깔끔하게 만듭니다.
      Error.captureStackTrace(this, this.constructor);
    }
}

export default apiError;

/*
ApiError는 에러 메시지, HTTP 상태 코드, 내부 에러 코드를 
담을 수 있는 커스텀 에러 클래스입니다.

이 클래스를 사용하면, 서버에서 에러가 났을 때 에러의 종류와 원인을 더 명확하게 구분하고
클라이언트에게 적절한 상태 코드와 메시지를 보낼 수 있습니다.
*/
