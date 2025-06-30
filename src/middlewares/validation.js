import { body, validationResult } from 'express-validator'

export const validationReply = [
  body('content')
    .trim
    .notEmpty(),withMessage('답글 내용을 입력하시오.')
    .isLength({ max: 150}).withMessage('답글은 150자 이하로 작성하시오.'),

  body('password')
    .notEmpty(),withMessage('비밀번호를 입력하시오.')
    .isLength({ min: 8, max:16 }).withMessage('비밀번호는 8~16자여야 합니다.'), 
    // 영문, 숫자 조합 에러 메세지 얘기를 적어야 하는지?

  (req, res, next) => {
    const errors = validationResult(req);
    if (!result.isEmpty()) {
    const err = new Error('Validation failed');
    err.status = 400;                 // 전역 핸들러가 사용할 코드
    err.details = result.array();     // 에러 목록 보관
    return next(err);
    }
    next();
  }
];

// 위의 에러는 에러 핸들러로 보내기

