import { CATEGORY } from '@prisma/client';

const convertCategoryToEnumType = (str) => {
    let convertedStr
    switch (str) {
        case "top":
            convertedStr = CATEGORY.TOP;
            break;
        case "bottom":
            convertedStr = CATEGORY.BOTTOM;
            break;
        case "outer":
            convertedStr = CATEGORY.OUTER;
            break;
        case "dress":
            convertedStr = CATEGORY.DRESS;
            break;
        case "shoes":
            convertedStr = CATEGORY.SHOES;
            break;
        case "bag":
            convertedStr = CATEGORY.BAG;
            break;
        case "accessory":
            convertedStr = CATEGORY.ACCESSORY;
            break;
        default:
            convertedStr = null;
    }
    return convertedStr;
}

export default convertCategoryToEnumType;