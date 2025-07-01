// src/utils/logger.js

const logger = {
    /**
     * 일반 정보 메시지를 기록합니다.
     * @param {string} message - 로그 메시지
     * @param {object} [meta={}] - 추가적인 메타데이터 (선택 사항)
     */
    info: (message, meta = {}) => {
        // 개발 환경에서는 콘솔에 출력
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta);
        }
        // TODO: 실제 운영 환경에서는 Winston, Pino 같은 라이브러리 또는
        // 클라우드 로깅 서비스(AWS CloudWatch, Google Cloud Logging 등)로 전송 로직 추가
    },

    /**
     * 경고 메시지를 기록합니다.
     * @param {string} message - 로그 메시지
     * @param {object} [meta={}] - 추가적인 메타데이터 (선택 사항)
     */
    warn: (message, meta = {}) => {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta);
        // TODO: 운영 환경에서는 경고 알림(Slack, Email 등) 또는 특정 로깅 레벨 설정
    },

    /**
     * 에러 메시지를 기록합니다. (가장 중요)
     * @param {string} message - 에러 메시지
     * @param {object} [meta={}] - 에러 스택, 요청 정보 등 추가 메타데이터
     */
    error: (message, meta = {}) => {
        // 에러는 개발/운영 환경 모두에서 콘솔에 출력하는 것이 일반적
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta);
        // TODO: 실제 운영 환경에서는 Sentry, New Relic, Bugsnag 같은
        // 에러 모니터링 서비스로 에러를 전송하는 로직을 반드시 추가해야 합니다.
        // 이를 통해 실시간으로 에러를 인지하고 추적할 수 있습니다.
    },

    /**
     * 디버그 메시지를 기록합니다. (개발 환경 전용)
     * @param {string} message - 로그 메시지
     * @param {object} [meta={}] - 추가적인 메타데이터 (선택 사항)
     */
    debug: (message, meta = {}) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, meta);
        }
    }
};

// ES6 모듈 시스템을 사용하여 내보냅니다.
export default logger;