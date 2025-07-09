import { CATEGORY } from '@prisma/client';

const stringToEnumMap = {
  top: CATEGORY.TOP,
  bottom: CATEGORY.BOTTOM,
  outer: CATEGORY.OUTER,
  dress: CATEGORY.DRESS,
  shoes: CATEGORY.SHOES,
  bag: CATEGORY.BAG,
  accessory: CATEGORY.ACCESSORY,
};

const enumToStringMap = {
  [CATEGORY.TOP]: 'top',
  [CATEGORY.BOTTOM]: 'bottom',
  [CATEGORY.OUTER]: 'outer',
  [CATEGORY.DRESS]: 'dress',
  [CATEGORY.SHOES]: 'shoes',
  [CATEGORY.BAG]: 'bag',
  [CATEGORY.ACCESSORY]: 'accessory',
};

const convertCategoryToEnumType = (str) => {
  return stringToEnumMap[str] || null;
};

const convertCategoryToStringType = (arg) => {
  return enumToStringMap[arg] || null;
};

export { convertCategoryToEnumType, convertCategoryToStringType };