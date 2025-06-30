import bcrypt from 'bcrypt'; // npm install bcrypt --save 실행 필수

export const hashPassword = async (req, _res, next) => {
  try { 
    // DB에 저장된 비밀번호를 가져오는 것이 아닌 사용자가 입력하는 비밀번호를 가져오는 코드
    const plain = req.body?.password;
    if (typeof plain !== 'string' || plain.trim() === '') {
      const err = new Error('비밀번호 내용이 비어있습니다.');
      err.status = 400;
      return next(err); // 에러 핸들러로 오류 위임
    }
    req.body.passwordHash = await bcrypt.hash(plain, 10); // 10번의 salt 해시를 거쳐 엄호화하는 과정
    delete req.body.password; // 원본 비밀번호 삭제
    next();
  } catch (err) {
    next(err); // 에러 핸들러로 오류 위임
  }
};

// 위의 에러는 에러 핸들러로 보내기