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
}
export default styleService;