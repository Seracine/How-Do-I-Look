class imageUpError extends Error {
  constructor(message, details) {
    super(message);
    this.statusCode = 400;
    this.details = details;
    this.code =code;
  }
}

throw new imageUpError("오류",["이미지 형식이 올바르지 않습니다."]);

export default imageUpError;