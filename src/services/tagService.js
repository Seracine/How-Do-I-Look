import { prisma } from '../utils/prismaInstance.js'

const tagService = {
    getPopularTags: async () => {
        const limit = 6; // 최대 몇개까지 가져올건지 figma 기준 
        let popularTags = await prisma.tag.findMany({
            take: limit, 
            select: {
                tagname: true,
            },
            orderBy : { count: 'desc' }, // 사용중인 개수 순으로 정렬, count가 높으면 먼저 나오게 됨
        })
        return popularTags = { tags: popularTags.map(({ tagname }) => tagname)}; // 프론트에서 tags로 구조분해 하고 있으니 tags에 담아서 리턴
    },
}

export default tagService;