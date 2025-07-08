import { array, literal, number, object, optional, refine, string, union, size, } from 'superstruct';
import { ValidationError } from '../utils/appError.js'

export const handleValidationErrors = (res, errors) => {

  const extractedErrors = errors.failures().map(failure => {
    return { message: failure.message };
  });

  return res.status(422).json({
    message: '요청 데이터 유효성 검사에 실패했습니다.',
    errors: extractedErrors,
  });
};
// 공통 유효성 검사
export const intIdSchema = refine(number(), 'intId', (value) => {
  return Number.isInteger(value) && value > 0 || '유효한 ID 형식이 아닙니다.';
});

export const positiveIntegerSchema = refine(number(), 'positiveInteger', (value) => {
  return Number.isInteger(value) && value > 0 || '양의 정수만 입력할 수 있습니다.';
});

export const passwordSchema = refine(string(), 'password', (value) => {
  return /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value) ||
    '비밀번호는 영문과 숫자 조합으로 8자에서 16자 사이여야 합니다.';
});

export const imageUrlsSchema = refine(array(string()), 'imageUrls', (urls) => {
  const isValid = urls.every(url =>
    /^.+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url)
  );
  return isValid || '유효한 이미지 경로 형식이 아닙니다.';
});

export const nicknameSchema = size(string(), 1, 20);

export const titleSchema = size(string(), 1, 30);

export const contentSchema = size(string(), 1, 500);

export const tagSchema = union([
  literal(''),
  size(string(), 1, 20)
]);

export const tagsArraySchema = refine(array(tagSchema), 'tagsArrayLimit', (value) => {
  return value.length <= 3 || '태그는 최대 3개까지 입력할 수 있습니다.';
});

export const scoreSchema = refine(number(), 'scoreRange', (value) => {
  return Number.isInteger(value) && value >= 0 && value <= 10 || '점수는 0 이상 10 이하의 정수여야 합니다.';
});
//enum 타입 정의
export const sortByEnum = {
  latest: 'latest',
  mostViewed: 'mostViewed',
  mostCurated: 'mostCurated',
};

export const searchByStyleEnum = {
  nickname: 'nickname',
  title: 'title',
  content: 'content',
  tag: 'tag'
};

export const searchByCuratingEnum = {
  nickname: 'nickname',
  content: 'content',
};

export const rankByEnum = {
  total: 'total',
  trendy: 'trendy',
  personality: 'personality',
  practicality: 'practicality',
  costEffectiveness: 'costEffectiveness',
};

export const categoryKeyEnum = {
  top: 'top',
  bottom: 'bottom',
  outer: 'outer',
  dress: 'dress',
  shoes: 'shoes',
  bag: 'bag',
  accessory: 'accessory',
};

export const categoryValueFieldEnum = {
  name: 'name',
  brand: 'brand',
  price: 'price',
};

export const categoryValueSchema = object({
  [categoryValueFieldEnum.name]: size(string(), 1, 20),
  [categoryValueFieldEnum.brand]: size(string(), 1, 20),
  [categoryValueFieldEnum.price]: refine(number(), 'itemPriceRange', (value) => {
    return value >= 0 && value <= 100000000 && Number.isInteger(value) || '가격은 0 이상 100,000,000 이하의 정수여야 합니다.';
  }),
});
// 스타일유효성검사
export const styleFormInputSchema = refine(
  object({
    imageUrls: imageUrlsSchema,
    tags: tagsArraySchema,
    title: titleSchema,
    nickname: nicknameSchema,
    content: contentSchema,
    categories: object({
      [categoryKeyEnum.top]: optional(categoryValueSchema),
      [categoryKeyEnum.bottom]: optional(categoryValueSchema),
      [categoryKeyEnum.outer]: optional(categoryValueSchema),
      [categoryKeyEnum.dress]: optional(categoryValueSchema),
      [categoryKeyEnum.shoes]: optional(categoryValueSchema),
      [categoryKeyEnum.bag]: optional(categoryValueSchema),
      [categoryKeyEnum.accessory]: optional(categoryValueSchema),
    }),
    password: passwordSchema,
  }),
  'StyleFormInputWithCategoryCheck',
  (value) => {
    const categoryValues = Object.values(value.categories);
    const hasAtLeastOneCategory = categoryValues.some(catValue => {
      try {
        categoryValueSchema.create(catValue);
        return true;
      } catch (e) {
        return false;
      }
    });

    return hasAtLeastOneCategory || '카테고리는 최소 하나 이상 선택해야 합니다.';
  }
);

export const styleUpdateFormInputSchema = refine(
  object({
    imageUrls: optional(imageUrlsSchema),
    tags: optional(tagsArraySchema),
    title: optional(titleSchema),
    nickname: optional(nicknameSchema),
    content: optional(contentSchema),
    categories: optional(object({
      [categoryKeyEnum.top]: optional(categoryValueSchema),
      [categoryKeyEnum.bottom]: optional(categoryValueSchema),
      [categoryKeyEnum.outer]: optional(categoryValueSchema),
      [categoryKeyEnum.dress]: optional(categoryValueSchema),
      [categoryKeyEnum.shoes]: optional(categoryValueSchema),
      [categoryKeyEnum.bag]: optional(categoryValueSchema),
      [categoryKeyEnum.accessory]: optional(categoryValueSchema),
    })),
    password: passwordSchema,
  }),
  'StyleUpdateFormInputWithCategoryCheck',
  (value) => {
    if (value.categories !== undefined) {
      const categoryValues = Object.values(value.categories);
      const hasAtLeastOneCategory = categoryValues.some(catValue => {
        try {
          categoryValueSchema.create(catValue);
          return true;
        } catch (e) {
          return false;
        }
      });
      return hasAtLeastOneCategory || '카테고리는 최소 하나 이상 선택해야 합니다.';
    }
    return true;
  }
);

export const styleDeleteFormInputSchema = object({
  password: passwordSchema,
});
// 큐레이션 유효성 검사
export const curatingFormInputSchema = object({
  nickname: nicknameSchema,
  content: contentSchema,
  password: passwordSchema,
  trendy: scoreSchema,
  personality: scoreSchema,
  practicality: scoreSchema,
  costEffectiveness: scoreSchema
});

export const curatingUpdateFormInputSchema = object({
  nickname: optional(nicknameSchema),
  content: optional(contentSchema),
  password: passwordSchema,
  trendy: optional(scoreSchema),
  personality: optional(scoreSchema),
  practicality: optional(scoreSchema),
  costEffectiveness: optional(scoreSchema),
});

export const curatingDeleteFormInputSchema = object({
  password: passwordSchema,
});
// reply 유효성 검사
export const replyFormInputSchema = object({
  content: contentSchema,
  password: passwordSchema,
});

export const replyUpdateFormInputSchema = object({
  content: optional(contentSchema),
  password: passwordSchema,
});

export const replyDeleteFormInputSchema = object({
  password: passwordSchema,
});
//쿼리 스키마 유효성 검사
export const stylesQuerySchema = object({
  page: optional(positiveIntegerSchema), 
  pageSize: optional(positiveIntegerSchema), 
  sortBy: optional(union([
    literal(sortByEnum.latest),
    literal(sortByEnum.mostViewed),
    literal(sortByEnum.mostCurated),
  ])),
  searchBy: optional(union([
    literal(searchByStyleEnum.nickname),
    literal(searchByStyleEnum.title),
    literal(searchByStyleEnum.content),
    literal(searchByStyleEnum.tag),
  ])),
  keyword: optional(union([
    literal(''),
    size(string(), 1, 100)
  ])),
  tag: optional(tagSchema),
});

export const rankingsQuerySchema = object({
  rankBy: union([
    literal(rankByEnum.total),
    literal(rankByEnum.trendy),
    literal(rankByEnum.personality),
    literal(rankByEnum.practicality),
    literal(rankByEnum.costEffectiveness),
  ]),
  page: optional(positiveIntegerSchema), 
  pageSize: optional(positiveIntegerSchema), 
});

export const curationsQuerySchema = object({
  page: optional(positiveIntegerSchema), 
  pageSize: optional(positiveIntegerSchema), 
  searchBy: optional(union([
    literal(searchByCuratingEnum.nickname),
    literal(searchByCuratingEnum.content),
  ])),
  keyword: optional(size(string(), 1, 100)),
});

//유효성 검사 미들웨어
export const validateBody = (schema) => (req, res, next) => {
  try {
    schema.create(req.body);
    next();
  } catch (error) {
    if (error instanceof Error && 'failures' in error) {
      console.log(error.message)
      throw new (ValidationError)
    }
    next(error);
  }
};

export const validateQuery = (schema) => (req, res, next) => {
  try {
    const parsedQuery = {};
    for (const key in req.query) {
      // 숫자여야 할 쿼리 파라미터 (예: page, pageSize)를 여기에 추가
      if (['page', 'pageSize'].includes(key) && req.query[key] !== undefined) {
        const numValue = Number(req.query[key], 10);
        parsedQuery[key] = isNaN(numValue) ? req.query[key] : numValue;
      } else {
        parsedQuery[key] = req.query[key];
      }
    }
    schema.create(parsedQuery);
    next();
  } catch (error) {
    if (error instanceof Error && 'failures' in error) {
      console.log(error.message)
      throw new (ValidationError)
    }
    next(error);
  }
};

export const validateParams = (paramKeys) => (req, res, next) => {
  try {
    const parsedParams = {};
    const schemaFields = {}; // 검증에 사용할 스키마 필드를 동적으로 만듭니다.
    for (const key of paramKeys) {
      const rawValue = req.params[key];

      if (rawValue === undefined) {
        parsedParams[key] = undefined;
      } else {
        const numValue = Number(rawValue, 10);
        // 숫자로 변환 성공하면 숫자, 실패하면 원본 문자열을 parsedParams에 할당
        parsedParams[key] = isNaN(numValue) ? rawValue : numValue;
      }
      schemaFields[key] = intIdSchema;
    }
    // 동적으로 생성된 object 스키마로 parsedParams를 검증합니다.
    const dynamicSchema = object(schemaFields);
    dynamicSchema.create(parsedParams);
    next();
  } catch (error) {
    if (error instanceof Error && 'failures' in error) {
      console.log(error.message)
      throw new (ValidationError)
    }
    next(error);
  }
};