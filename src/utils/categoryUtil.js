import { convertCategoryToEnumType, convertCategoryToStringType } from "./convertToEnum.js";

const convertCategoriesForRes = (categories) => {
    const categoriesforRes = {};
    categories.forEach((category) => {
        const { id, styleId, type, ...categoryBody } = category;
        categoriesforRes[convertCategoryToStringType(type)] = categoryBody;
    })
    return categoriesforRes;
}

const convertCategoriesForDB = (categories) => {
    return Object.entries(categories).map( // create를 통한 연관 테이블 생성을 위해 : 객체 -> 배열 변환
        ([categoryType, categoryBody]) => { // DB에 저장될 때, 종류까지 저장해야 하므로 val에 넣음
            categoryBody.type = convertCategoryToEnumType(categoryType);
            return categoryBody;
        })
}

const extractTagnameList = (tags) => {
  return tags.map(({ tagname }) => tagname);
}

export { convertCategoriesForRes, convertCategoriesForDB, extractTagnameList }