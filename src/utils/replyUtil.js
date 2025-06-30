import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = (plain) => bcrypt.hash(plain, SALT_ROUNDS);  // 비동기 Promise 반환

export const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);

export const limitLength = (text = '', max = 300) =>
  text.length <= max ? text : text.slice(0, max);

export const capitalize = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1);


// 유틸에 넣을 것
// 비밀번호 암호화
// 글자 수 제한
