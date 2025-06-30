import { array, boolean, defaulted, literal, number, object, optional, refine, string, union } from 'superstruct';

const handleValidationErrors = (res, errors) => {

  const extractedErrors = errors.failures().map(failure => {
    return {
      field: failure.path.join('.'),
      message: failure.message,
      expected: failure.type,
      received: typeof failure.value,
      value: failure.value
    };
  });

  return res.status(422).json({
    message: '요청 데이터 유효성 검사에 실패했습니다.',
    errors: extractedErrors,
  });
};

export const intIdSchhema = refine(number(), 'intId', (value) => {
  return Number.isInteger(value) && value > 0 || '유효한 ID 형식이 아닙니다.';
});

export const passwordSchema = refine(string(), 'password', (value) => {
  return /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value) ||
    '비밀번호는 영문과 숫자 조합으로 8자에서 16자 사이여야 합니다.';
});