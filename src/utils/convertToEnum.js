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

const convertCategoryToStringType = (arg) => {
    let convertedEnum
    switch (arg) {
        case CATEGORY.TOP:
            convertedEnum = "top";
            break;
        case CATEGORY.BOTTOM:
            convertedEnum = "bottom";
            break;
        case CATEGORY.OUTER:
            convertedEnum = "outer";
            break;
        case CATEGORY.DRESS:
            convertedEnum = "dress";
            break;
        case CATEGORY.SHOES:
            convertedEnum = "shoes";
            break;
        case CATEGORY.BAG:
            convertedEnum = "bag";
            break;
        case CATEGORY.ACCESSORY:
            convertedEnum = "accessory";
            break;
        default:
            convertedEnum = null;
    }
    return convertedEnum;
}

export { convertCategoryToEnumType, convertCategoryToStringType };