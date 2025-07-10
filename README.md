# 🎉 How Do I Look

사용자들이 자신의 스타일을 공유하고, 그에 대한 큐레이션과 답글을 주고받으며 스타일에 대한 의견을 나눌 수 있는 기능을 제공합니다.

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
    -   Request Body
         ```
         {
          	"nickname": "string",
          	"title": "string",
          	"content": "string",
          	"password": "string",
          	"categories": {
          		"top": {
          			"name": "string",
          			"brand": "string",
          			"price": 0
          		},
          		"bottom": {
          			"name": "string",
          			"brand": "string",
          			"price": 1
          		},
          		"outer": {...},
          		"dress": {...},
          		"shoes": {...},
          		"bag": {...},
          		"accessory": {...}
          	},
          	"tags": [
          		"string",
          		"string"
          	],
          	"imageUrls": [
          		"string",
          		"string"
             ]
          }
         ```
    -   응답: `201 CREATED` 생성된 스타일 객체 
        ```
        {
        	"id": 1,
        	"nickname": "string",
        	"title": "string",
        	"content": "string",
        	"viewCount": 0,
        	"curationCount": 0,
        	"createdAt": "2024-02-22T07:47:49.803Z",
        	"categories": {
        		"top": {
        			"name": "string",
        			"brand": "string",
        			"price": 0
        		},
        		"bottom": {
        			"name": "string",
        			"brand": "string",
        			"price": 1
        		},
        	},
        	"tags": [
        		"string",
        		"string"
        	],
        	"imageUrls": [
        		"string",
        		"string"
    	      ]
        }
        ```

-   **`GET /styles`**
    -   설명: 모든 스타일 목록을 조회합니다.
    -   응답: `[ { id: 1, name: "내 스타일" }, ... ]`

-   **`GET /styles/:styleId`**
    -   설명: 특정 스타일을 조회합니다.
    -   응답: ` { id: 1, name: "내 스타일", ... }`
 
-   **`PUT /styles/:styleId`**
    -   설명: 스타일을 수정합니다.
    -   응답: ` { id: 1, name: "내 스타일", ... }`
 
-   **`DELETE /styles`**
    -   설명: 스타일을 삭제합니다.
    -   응답: `[ { id: 1, name: "내 스타일" }, ... ]`

-   **`GET /ranking`**
    -   설명: 스타일 랭킹 목록을 조회합니다.
    -   응답: ` { id: 1, name: "내 스타일", ... }`

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


















