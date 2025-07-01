export default class imageUpError extends Error {
  constructor(message, details) {
    super(message);
    this.type = type; // 'SIZE_LIMIT', 'INVALID_TYPE', 'SECURITY'
    this.statusCode = this.getStatusCode(type);
    this.details = details; // { fileName, maxSize, allowedTypes }
  }

  getStatusCode(type) {
    const codes = {
      SIZE_LIMIT: 400,
      INVALID_TYPE: 400,
      SECURITY: 403,
      ENTITY_FAILED: 409,
      SYSTEM: 500
    };
    return codes[type] || 500;
  }
}
