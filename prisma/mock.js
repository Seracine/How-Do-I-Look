import { CATEGORY } from '@prisma/client';

export const mockTags = [
    { tagname: '데일리룩' },
    { tagname: '봄코디' },
    { tagname: '캐주얼' },
    { tagname: '데이트룩' },
    { tagname: '미니멀' },
    { tagname: '스트릿' },
    { tagname: '오피스룩' },
    { tagname: '가을코디' },
    { tagname: '힙합' },
    { tagname: '겨울코디' },
    { tagname: '여행룩' },
    { tagname: '페미닌' },
    { tagname: '레트로' },
];

export const mockStyles = [
    {
        nickname: '스타일마스터',
        password: 'password123',
        title: '산뜻한 봄 데일리룩, 코지 무드 연출',
        content: '가벼운 소재의 맨투맨과 와이드 팬츠로 편안하면서도 스타일리시한 봄 코디를 완성했습니다.',
        imageUrls: ['https://cdn.pixabay.com/photo/2025/05/24/12/40/whale-9619752_1280.png', 'https://cdn.pixabay.com/photo/2024/04/18/08/05/girl-8703774_640.png', 'https://cdn.pixabay.com/photo/2025/05/06/12/05/bike-9582579_640.png'],
        viewCount: 1200,
        curationCount: 15,
        tags: ['데일리룩', '봄코디', '캐주얼'],
    },
    {
        nickname: '패션러버',
        password: 'password123',
        title: '시크한 어반 시티룩, 모던함 강조',
        content: '세련된 트렌치코트와 슬랙스로 도시적인 느낌을 살린 데이트룩입니다. 미니멀한 액세서리로 포인트를 주었습니다.',
        imageUrls: ['https://cdn.pixabay.com/photo/2025/05/16/16/14/investigation-9604083_640.png', 'https://cdn.pixabay.com/photo/2025/04/27/13/31/avocado-9563037_640.png'],
        viewCount: 850,
        curationCount: 8,
        tags: ['데이트룩', '미니멀', '오피스룩'],
    },
    {
        nickname: '힙스터K',
        password: 'password123',
        title: '힙하고 자유로운 스트릿 패션',
        content: '오버사이즈 후드티와 조거 팬츠로 편안하면서도 개성 넘치는 스트릿 감성을 표현했습니다.',
        imageUrls: ['https://cdn.pixabay.com/photo/2025/03/15/14/21/mountain-9472320_640.png'],
        viewCount: 2300,
        curationCount: 25,
        tags: ['스트릿', '힙합', '캐주얼'],
    },
    {
        nickname: '겨울감성',
        password: 'password123',
        title: '클래식한 겨울, 따뜻하고 세련된 무드',
        content: '울 코트와 니트 스웨터로 따뜻함과 클래식함을 동시에 잡은 겨울 코디입니다.',
        imageUrls: ['https://cdn.pixabay.com/photo/2025/04/28/15/52/travel-9565325_640.png', 'https://cdn.pixabay.com/photo/2025/01/14/18/29/ballerina-9333398_640.png'],
        viewCount: 1800,
        curationCount: 20,
        tags: ['겨울코디', '오피스룩', '미니멀'],
    },
    {
        nickname: '여행자',
        password: 'password123',
        title: '편안하고 스타일리시한 여름 휴가룩',
        content: '시원한 리넨 셔츠와 반바지로 휴가지에서 편안하게 즐길 수 있는 코디를 연출했습니다.',
        imageUrls: ['https://cdn.pixabay.com/photo/2025/03/24/20/08/climber-9491285_640.png', 'https://cdn.pixabay.com/photo/2024/11/18/10/20/businessman-9205819_640.png'],
        viewCount: 950,
        curationCount: 10,
        tags: ['여행룩', '캐주얼', '데일리룩'],
    },
    {
        nickname: '빈티지걸',
        password: 'password123',
        title: '사랑스러운 레트로 페미닌 원피스',
        content: '플로럴 패턴 원피스와 가디건으로 빈티지하면서도 여성스러운 매력을 뽐냈습니다.',
        imageUrls: ['https://cdn.pixabay.com/photo/2024/11/21/10/46/tool-9213481_640.png'],
        viewCount: 700,
        curationCount: 5,
        tags: ['페미닌', '레트로', '데이트룩'],
    },
];

export const mockCategoriesRaw = [
    { styleId: 1, type: 'top', name: '코지 루즈핏 맨투맨', brand: 'Comfort Apparel', price: 49000 },
    { styleId: 1, type: 'bottom', name: '와이드 코튼 팬츠', brand: 'Urban Fit', price: 62000 },
    { styleId: 1, type: 'shoes', name: '베이직 캔버스 스니커즈', brand: 'FootJoy', price: 55000 },

    { styleId: 2, type: 'outer', name: '클래식 트렌치코트', brand: 'Elegance Line', price: 180000 },
    { styleId: 2, type: 'bottom', name: '슬림핏 슬랙스', brand: 'Modern Wear', price: 75000 },
    { styleId: 2, type: 'bag', name: '미니멀 크로스백', brand: 'Simple Chic', price: 90000 },
    { styleId: 2, type: 'accessory', name: '골드 체인 목걸이', brand: 'Glam Acc', price: 35000 },

    { styleId: 3, type: 'top', name: '오버사이즈 후드티', brand: 'Street Vibe Co.', price: 85000 },
    { styleId: 3, type: 'bottom', name: '조거 스웨트 팬츠', brand: 'Urban Swagger', price: 70000 },

    { styleId: 4, type: 'outer', name: '핸드메이드 울 코트', brand: 'Winter Warm', price: 320000 },
    { styleId: 4, type: 'top', name: '캐시미어 니트 스웨터', brand: 'Luxury Knit', price: 150000 },
    { styleId: 4, type: 'shoes', name: '소가죽 첼시 부츠', brand: 'Urban Boots', price: 190000 },

    { styleId: 5, type: 'top', name: '내추럴 리넨 셔츠', brand: 'Vacay Look', price: 78000 },
    { styleId: 5, type: 'bottom', name: '코튼 숏 팬츠', brand: 'Summer Breeze', price: 45000 },
    { styleId: 5, type: 'shoes', name: '스트랩 샌들', brand: 'Sunny Steps', price: 60000 },

    { styleId: 6, type: 'dress', name: '플로럴 롱 원피스', brand: 'Vintage Heart', price: 110000 },
    { styleId: 6, type: 'outer', name: '숏 가디건', brand: 'Cozy Knit', price: 55000 },
];

export const mockCurationRaw = [
    {
        styleId: 1,
        nickname: '베스트코디',
        password: 'password123',
        content: '색감 조합이 너무 좋네요! 데일리룩으로 딱이에요.',
        trendy: 4, personality: 3, practicality: 5, costEffectiveness: 4,
        replyContent: {
            nickname: '스타일마스터',
            content: '감사합니다! 편안하면서도 스타일리시한 느낌을 주고 싶었어요.',
        }
    },
    {
        styleId: 1,
        nickname: '패션피플',
        password: 'password123',
        content: '바지 핏이 정말 예술이네요. 어디 제품인가요?',
        trendy: 5, personality: 4, practicality: 4, costEffectiveness: 3,
        replyContent: null
    },
    {
        styleId: 2,
        nickname: '스타일굿',
        password: 'password123',
        content: '트렌치코트 핏이 예뻐요! 데이트룩으로 딱일듯.',
        trendy: 4, personality: 4, practicality: 3, costEffectiveness: 4,
        replyContent: {
            nickname: '패션러버',
            content: '감사합니다! 클래식한 느낌을 살리고 싶었어요.',
        }
    },
    {
        styleId: 3,
        nickname: '힙합전사',
        password: 'password123',
        content: '이게 진짜 스트릿이죠! 너무 멋져요.',
        trendy: 5, personality: 5, practicality: 3, costEffectiveness: 2,
        replyContent: null
    },
    {
        styleId: 4,
        nickname: '클래식룩성공',
        password: 'password123',
        content: '코트랑 니트 조합이 환상적이네요. 고급스러워 보여요!',
        trendy: 4, personality: 4, practicality: 5, costEffectiveness: 3,
        replyContent: {
            nickname: '겨울감성',
            content: '감사합니다! 따뜻하고 세련된 느낌을 주고 싶었어요.',
        }
    },
    {
        styleId: 4,
        nickname: '웜톤찰떡',
        password: 'password123',
        content: '이런 코디에 부츠 신으면 진짜 예쁘죠.',
        trendy: 3,
        personality: 4,
        practicality: 4,
        costEffectiveness: 4,
        replyContent: null
    },
    {
        styleId: 5,
        nickname: '휴가룩장인',
        password: 'password123',
        content: '여행 갈 때 이렇게 입으면 딱이겠네요. 시원해 보여요.',
        trendy: 5,
        personality: 3,
        practicality: 5,
        costEffectiveness: 4,
        replyContent: {
            nickname: '여행자',
            content: '네, 휴가지에 최적화된 코디입니다!',
        }
    },
    {
        styleId: 6,
        nickname: '여성여성',
        password: 'password123',
        content: '원피스가 너무 사랑스러워요. 어디서 구매하셨나요?',
        trendy: 4,
        personality: 5,
        practicality: 3,
        costEffectiveness: 4,
        replyContent: {
            nickname: '빈티지걸',
            content: '감사합니다! 빈티지샵에서 구매했어요.',
        }
    },
];