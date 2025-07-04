import { prisma } from '../utils/prismaInstance.js'
import { convertCategoriesForRes, convertCategoriesForDB } from '../utils/categoryUtil.js'
import { hashPassword, checkPassword } from '../utils/passwordHash.js';

const styleService = {
    createStyle: async (styleBody) => {
        const { categories: categoriesReq, tags: tagNames, password, ...styleField } = styleBody;
        const categories = convertCategoriesForDB(categoriesReq);

        const style = await prisma.style.create({
            data: {
                ...styleField,
                password: hashPassword(password),
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
                password: true,
                tags: true,
            },
        })
        if (!oldStyle)  // 여기서 못찾으면 컨트롤러에서 에러 처리 - 추후 에러 코드를 던지는 식으로 변경
            throw new Error("E404");
        if (!checkPassword(styleBody.password, oldStyle.password)) { // 비밀번호가 맞지 않을 경우 에러, 해쉬 처리후 비교 필요
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

        const { categories: categoriesReq, tags: tagNames, password, ...styleField } = styleBody;
        const categories = convertCategoriesForDB(categoriesReq);

        const style = await prisma.style.update({ // 수정할 내용으로 업데이트
            where: { id: styleId },
            data: { //비밀번호가 수정되지는 않기 때문에 password는 제외함
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

    deleteStyle: async (styleId, styleBody) => { // 현재 로직대로면 tag가 0개인 경우에도 테이블에 남아있게 됨. 남겨도 될지는 고민 - 추후에 같은 이름의 태그가 들어오면 해당 레코드를 사용하면 되므로
        const Style = await prisma.style.findUnique({ // 여기서 못찾으면 컨트롤러에서 에러 처리
            where: { id: styleId },
            select: { //category랑 tags는 응답 형식에 맞추기 위해 별도로 추가, curationCount도 findmany메서드 등을 통해 개수 확인 후 추가
                password: true,
                tags: true,
            },
        })
        if (!Style)
            throw new Error("E404");
        if (!checkPassword(styleBody.password, Style.password)) { // 비밀번호가 맞지 않을 경우 에러, 해쉬 처리후 비교 필요
            throw new Error("E403");
        }

        await prisma.style.update({ // 태그 중간 테이블 연결해제
            where: { id: styleId },
            data: {
                tags: {
                    set: [],
                },
            },
        });
        const StyleTags = Style.tags.map(t => t.tagname);
        await prisma.tag.updateMany({ // 스타일에 등록된 태그들 숫자 1씩 감소
            where: {
                tagname: {
                    in: StyleTags,
                },
            },
            data: {
                count: {
                    decrement: 1,
                },
            },
        })
        await prisma.style.delete({ // 스타일제거, category는 cascade로 같이 지워짐
            where: { id: styleId },
        })
    },

    getStyleList: async (queryParams) => {
        const { page = 1, pageSize = 12, sortBy = 'latest', searchBy, keyword = '', tag = '' } = queryParams;

        // orderBy 조건 정리
        let orderBy;
        switch (sortBy) { // latest | mostViewed | mostCurated
            case 'mostViewed':
                orderBy = { viewCount: 'desc' };
                break;
            case 'mostCurated':
                orderBy = { curation: { _count: 'desc' } };
                break;
            case 'latest':
            default:
                orderBy = { createdAt: 'desc' };
                break;
        }

        // where 조건 정리
        let where;
        if (searchBy === 'tag') { // nickname | title | content | tag
            where = { tags: { some: { tagname: keyword } } }; // 태그명은 일부가 아니라 완전히 동일해야함
        } else {
            where = keyword
                ? {
                    [searchBy]: {
                        contains: keyword,
                        mode: 'insensitive',
                    }
                } : {};
        }

        // 조건에 맞는 style들을 검색해서 정렬된 값 가져오기
        const styleList = await prisma.style.findMany({
            skip: parseInt((page - 1) * pageSize),
            take: parseInt(pageSize),
            select: {
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
            where,
            orderBy,
        })

        // 응답 형식에 맞게 style 변환
        const data = styleList.map(style => {
            style.curationCount = style._count.curation;
            style._count = undefined;
            style.categories = convertCategoriesForRes(style.categories);
            style.tags = style.tags.map(({ tagname }) => tagname);
            style.thumbnail = style.imageUrls[0]; // 이미지들의 첫번째를 썸네일로 반환
            style.imageUrls = undefined;
            return style;
        });

        // 조건에 맞는 아이템 개수 조회 및 페이지 수 계산
        const totalItemCount = await prisma.style.count({ where });
        const totalPages = Math.ceil(totalItemCount / pageSize);

        // 최종 결과 반환
        const resStyleList = {
            currentPage: page,
            totalPages,
            totalItemCount,
            data,
        }

        return resStyleList;
    },

    getStyle: async (styleId) => {
        const style = await prisma.style.update({ // 있는지 찾고, viewcount1 증가, 없는 경우 P2025코드로 에러 던짐
            where: { id: styleId },
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
            data: {
                viewCount: {
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