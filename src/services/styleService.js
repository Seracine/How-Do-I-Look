import { prisma } from '../utils/prismaInstance.js'
import { convertCategoriesForRes, convertCategoriesForDB } from '../utils/categoryUtil.js'

const styleService = {
    createStyle: async (styleBody) => {
        const { categories: categoriesReq, tags: tagNames, ...styleField } = styleBody;
        const categories = convertCategoriesForDB(categoriesReq);

        const style = await prisma.style.create({
            data: {
                ...styleField,
                categories: {
                    create: categories,
                },
                tags: {
                    connectOrCreate: tagNames.map((tagname) => ({
                        where: { tagname }, // 이 tagname와 같은 이름을 가진 Tag가 이미 존재하는가
                        create: { tagname }, // 존재하지 않으면 생성
                    }))
                }
            },
            select: { //category, tags, curationCount는 응답 형식에 맞추기 위해 별도 과정 추가
                id: true,
                nickname: true,
                title: true,
                content: true,
                viewCount: true,
                createdAt: true,
                categories: true,
                tags: true,
                imageUrls: true,
                _count: {
                    select: {
                        curation: true,
                    },
                },
            },
        })
        await prisma.tag.updateMany({ // 스타일에 등록된 태그들 숫자 1씩 증가
            where: {
                tagname: {
                    in: tagNames,
                },
            },
            data: {
                count: {
                    increment: 1,
                },
            },
        })

        style.curationCount = style._count.curation;
        style._count = undefined; // curationCount에 정의를 해주었으므로 속성 제거
        style.categories = convertCategoriesForRes(style.categories); // Response 타입으로 형식 맞추기

        return { // tagname만 꺼내와서 배열로 추가 후 리턴
            ...style,
            tags: style.tags.map(({ tagname }) => tagname),
        };
    },

    updateStyle: async (styleId, styleBody) => { // 현재 로직대로면 tag가 0개인 경우에도 테이블에 남아있게 됨. 남겨도 될지는 고민 - 추후에 같은 이름의 태그가 들어오면 해당 레코드를 사용하면 되므로
        const oldStyle = await prisma.style.findUnique({
            where: { id: styleId },
            select: {
                id: true,
                nickname: true,
                password: true,
                title: true,
                content: true,
                viewCount: true,
                createdAt: true,
                imageUrls: true,
                tags: true,
            },
        })
        if (!oldStyle)  // 여기서 못찾으면 컨트롤러에서 에러 처리 - 추후 에러 코드를 던지는 식으로 변경
            throw new Error("E404");
        if (styleBody.password !== oldStyle.password) { // 비밀번호가 맞지 않을 경우 에러, 해쉬 처리후 비교 필요
            throw new Error("E403");
        }

        await prisma.category.deleteMany({ // 연결된 카테고리들 먼저 제거
            where: { styleId: styleId },
        })
        await prisma.style.update({ // 중간 테이블 연결해제
            where: { id: styleId },
            data: {
                tags: {
                    set: [],
                },
            },
        });
        const oldStyleTags = oldStyle.tags.map(t => t.tagname);
        await prisma.tag.updateMany({ // 스타일에 등록된 태그들 숫자 1씩 감소
            where: {
                tagname: {
                    in: oldStyleTags,
                },
            },
            data: {
                count: {
                    decrement: 1,
                },
            },
        })

        const { categories: categoriesReq, tags: tagNames, ...styleField } = styleBody;
        const categories = convertCategoriesForDB(categoriesReq);

        const style = await prisma.style.update({ // 수정할 내용으로 업데이트
            where: { id: styleId },
            data: {
                ...styleField,
                categories: {
                    create: categories,
                },
                tags: {
                    connectOrCreate: tagNames.map((tagname) => ({
                        where: { tagname }, // 이 tagname와 같은 이름을 가진 Tag가 이미 존재하는가
                        create: { tagname }, // 존재하지 않으면 생성
                    }))
                }
            },
            select: { //category, tags, curationCount는 응답 형식에 맞추기 위해 별도 과정 추가
                id: true,
                nickname: true,
                title: true,
                content: true,
                viewCount: true,
                createdAt: true,
                categories: true,
                tags: true,
                imageUrls: true,
                _count: {
                    select: {
                        curation: true,
                    },
                },
            },
        })
        await prisma.tag.updateMany({ // 스타일에 등록된 태그들 숫자 1씩 증가
            where: {
                tagname: {
                    in: tagNames,
                },
            },
            data: {
                count: {
                    increment: 1,
                },
            },
        })

        style.curationCount = style._count.curation;
        style._count = undefined; // curationCount에 정의를 해주었으므로 속성 제거
        style.categories = convertCategoriesForRes(style.categories); // Response 타입으로 형식 맞추기

        return { // tagname만 꺼내와서 배열로 추가 후 리턴
            ...style,
            tags: style.tags.map(({ tagname }) => tagname),
        };
    },
}
export default styleService;