# 🎉 How Do I Look

사용자들이 자신의 스타일을 공유하고, 그에 대한 큐레이션과 답글을 주고받으며 스타일에 대한 의견을 나눌 수 있는 기능을 제공합니다.
<img width="1200" height="700" alt="image" src="https://github.com/user-attachments/assets/c92889ce-126b-49fd-a27b-4e118b84b2d0" />


## 📁 프로젝트 구조
```
.
├── .env                  # 환경 변수 파일 (gitignore에 추가)
├── .gitignore            # Git이 추적하지 않을 파일 및 디렉토리 설정
├── package.json          # 프로젝트 의존성 및 스크립트 정의
├── package-lock.json     # 의존성 버전 고정 파일
├── app.js                # Express 애플리케이션 진입점 및 미들웨어 설정
├── prisma/               # Prisma ORM 관련 파일
│   ├── migrations/       # 데이터베이스 마이그레이션 파일
│   └── schema.prisma     # Prisma 스키마 정의 파일 (모델, 관계 등)
├── src/                  # 소스 코드 디렉토리
│   ├── controllers/      # 요청 처리 로직 (라우터에서 호출)
│   ├── middlewares/      # 미들웨어 함수 (예: 유효성 검사, 업로드 미들웨어)
│   ├── routers/          # API 라우트 정의 (엔드포인트 및 컨트롤러 연결)
│   ├── services/         # 비즈니스 로직 (컨트롤러에서 호출, prisma를 직접 실행하는 부분)
│   └── utils/            # 유틸리티 함수 또는 클래스 (예: 커스텀 에러 클래스, 비밀번호 해싱 함수, 카테고리 변환 함수 등)
└── README.md             # 현재 보고 있는 프로젝트 설명 문서
```

## ✨ 주요 기능

- **스타일 관리:** 스타일 생성, 목록 조회, 상세 조회, 수정, 삭제 기능.
    - 스타일 목록 페이지네이션 및 닉네임, 제목, 상세, 태그로 검색 기능 포함.
    - 최신순, 조회순, 큐레이팅순(큐레이팅 많은 순)으로 정렬 가능.
    - 갤러리 상단에 인기 태그가 표시되며, 해당 태그를 클릭하면 그 태그에 해당하는 스타일 목록이 표시.
    - multer를 사용하여 이미지 업로드
      
- **큐레이션 관리:** 특정 스타일에 종속된 큐레이션 생성, 조회, 수정, 삭제 기능.
    - 큐레이션 목록 페이지네이션 및 닉네임, 내용으로 검색이 가능.
    - 큐레이팅에 남겨진 답글도 같이 조회.
- **랭킹 관리:** 전체, 트렌디, 개성, 실용성, 가성비 기준으로 스타일 랭킹 목록을 조회.
- **답글 관리:** 큐레이션에 종속된 댓글 생성, 조회, 수정, 삭제 기능.
    - 스타일 등록 시 입력했던 비밀번호와 일치해야 기능 사용 가능.
    - 답글은 큐레이터당 하나씩만 등록 가능
- **비밀번호 기반 인증:** 스타일 및 관련 콘텐츠(큐레이션, 댓글) 관리를 위한 비밀번호 인증.
- **데이터 유효성 검사:** superstruct를 이용한 미들웨어로 Request Body, Request Query 및 쿼리 파라미터 유효성 검사.
- **전역 에러 핸들링:** 일관된 에러 응답 처리. 개별 Request Handler에서 에러가 발생하는 경우, Global Error Handler에서 처리하도록 구현

## 🛠️ 기술 스택

-   **Backend:** Node.js, Express.js
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Authentication:** bcrypt (비밀번호 해싱)
-   **Validation:** superstruct
-   **ImageUpload:** multer
-   **Deployment:** Render

## 🚀 API 엔드포인트

### 스타일 (Style)
-   **`POST /styles`**
    -   설명: 새로운 스타일을 생성합니다.
    -   Request Body : `{ "nickname": "string", "title": "string", "content": "string", "password": "string", "categories": object, "tags": array, "imageUrls": array }`
    -   응답: `201 CREATED`, 생성된 스타일 객체 

-   **`GET /styles`**
    -   설명: 모든 스타일 목록을 조회합니다.
    -   파라미터
        - `pageSize` : number (페이지당 아이템 수)
        - `sortBy` : latest | mostViewed | mostCurated (정렬 기준)
        - `searchBy` : nickname | title | content | tag (검색 기준)
        - `keyword` : string (검색어)
        - `tag` : string (태그)
    -   응답: `200 OK`, 모든 스타일 객체의 리스트

-   **`GET /styles/:styleId`**
    -   설명: 특정 스타일을 조회합니다.
    -   응답: `200 OK`, 조회한 스타일 객체
 
-   **`PUT /styles/:styleId`**
    -   설명: 스타일을 수정합니다.
    -   Request Body : `{ "nickname": "string", "title": "string", "content": "string", "password": "string", "categories": object, "tags": array, "imageUrls": array }`
    -   응답: `200 OK`, 수정한 스타일 객체
 
-   **`DELETE /styles`**
    -   설명: 스타일을 삭제합니다.
    -   Request Body : `{ "password": "string" }`
    -   응답: `200 OK`, `{ "message": "스타일 삭제 성공" }`

-   **`GET /ranking`**
    -   설명: 스타일 랭킹 목록을 조회합니다.
    -   파라미터
        - `page` : number (현재 페이지 번호)
        - `pageSize` : number (페이지당 아이템 수)
        - `rankBy` : total | trendy | personality | practicality, costEffectiveness (랭킹 기준)
    -   응답: `200 OK`, 점수와 랭킹이 포함된 스타일 객체 리스트

### 2. 큐레이션 (Curation)
-   **`POST /styles/:styleId/curations`**
    -   설명: 특정 스타일에 새로운 큐레이션을 생성합니다.
    -   요청 본문: `{ "title": "겨울 코디", "description": "따뜻한 겨울 룩", "stylePassword": "secure_password" }`
    -   응답: 생성된 큐레이션 객체

-   **`GET /styles/:styleId/curations`**
    -   설명: 특정 스타일의 모든 큐레이션 목록을 조회합니다. 페이지네이션 및 검색 가능.
    -   쿼리 파라미터: `?page=1&pageSize=10&searchBy=title&keyword=겨울`
    -   응답: `{ currentPage: 1, totalPages: 5, totalItemCount: 45, data: [ { id: 101, title: "겨울 코디", ... }, ... ] }`

-   **`PUT /curations/:curationId`**
    -   설명: 특정 큐레이션의 정보를 업데이트합니다. (스타일 비밀번호 필요)
    -   요청 본문: `{ "title": "봄 코디", "description": "산뜻한 봄 룩", "stylePassword": "secure_password" }`
    -   응답: 업데이트된 큐레이션 객체

-   **`DELETE /curations/:curationId`**
    -   설명: 특정 큐레이션을 삭제합니다. (스타일 비밀번호 필요)
    -   요청 본문: `{ "stylePassword": "secure_password" }`
    -   응답: `{ message: "큐레이션이 성공적으로 삭제되었습니다." }`

### 3. 답글 (Comment)
-   **`POST /curations/:curationId/comments`**
    -   설명: 특정 큐레이션에 새로운 댓글을 생성합니다. (스타일 비밀번호 필요)
    -   요청 본문: `{ "content": "너무 예뻐요!", "stylePassword": "secure_password" }`
    -   응답: 생성된 댓글 객체

-   **`GET /curations/:curationId/comments`**
    -   설명: 특정 큐레이션의 모든 댓글 목록을 조회합니다.
    -   응답: `[ { id: 201, content: "너무 예뻐요!", ... }, ... ]`

-   **`PUT /comments/:commentId`**
    -   설명: 특정 댓글의 내용을 업데이트합니다. (스타일 비밀번호 필요)
    -   요청 본문: `{ "content": "정말 좋아요!", "stylePassword": "secure_password" }`
    -   응답: 업데이트된 댓글 객체

-   **`DELETE /comments/:commentId`**
    -   설명: 특정 댓글을 삭제합니다. (스타일 비밀번호 필요)
    -   요청 본문: `{ "stylePassword": "secure_password" }`
    -   응답: `{ message: "댓글이 성공적으로 삭제되었습니다." }`
 
### 4. 태그 (Tag)


### 5. 이미지 (Image)


 
## 🚨 에러 처리

API는 에러 발생 시 미리 지정해놓은 커스텀 에러 객체를 thorw하여 전역 에러핸들러에서 처리합니다.

-   **400 Bad Request:** 잘못된 요청 본문이나 유효하지 않은 파라미터 (유효성 검사 실패).
    -   예시: `{ "message": "잘못된 요청입니다." }`
-   **403 Forbidden:** 리소스에 접근할 권한이 없음 (예: 비밀번호 불일치).
    -   예시: `{ "message": "비밀번호가 틀렸습니다." }`
-   **404 Not Found:** 요청한 리소스를 찾을 수 없음.
    -   예시: `{ "message": "존재하지 않습니다." }`
-   **500 Internal Server Error:** 서버 내부 오류 또는 prisma 오류.
    -   예시: `{ "message": "알 수 없는 에러 발생." }`


















