import { prisma } from '../utils/prismaInstance.js'
import { convertCategoriesForRes } from '../utils/categoryUtil.js'

class RankingService{
    getRankedStyleList = async (queryParams) => { // 예시 페이지를 보니 큐레이션이 1개 이상 있을때에만 랭킹에 올라가도록 되어있음
        const { page = 1, pageSize = 10, rankBy = 'total' } = queryParams;
        // rankBy는 total | trendy | personality | practicality, costEffectiveness
        const validRankBy = ['trendy', 'personality', 'practicality', 'costEffectiveness', 'total'];        

        let rankedGroups;

        if (rankBy === 'total') { // rankBy가 total 이면 값을 불러와서 평균 구한 후 정렬
            const groups = await prisma.curation.groupBy({
                by: ['styleId'],
                _avg: {
                    trendy: true,
                    personality: true,
                    practicality: true,
                    costEffectiveness: true,
                },
            });

            rankedGroups = groups.map(group => {
                const avg_total = (group._avg.trendy + group._avg.personality + group._avg.practicality + group._avg.costEffectiveness) / 4;
                return {
                    styleId: group.styleId,
                    _avg: {
                        total: avg_total,
                    },
                };
            }).sort((a, b) => b._avg.total - a._avg.total);
        } else { // 그 외에는 prisma 기능을 이용해 DB에서 가져올 때 정렬된 값을 가져옴
            rankedGroups = await prisma.curation.groupBy({
                by: ['styleId'],
                _avg: {
                    [rankBy]: true,
                },
                orderBy: {
                    _avg: {
                        [rankBy]: 'desc',
                    },
                },
            });
        }

        // 2. 페이지네이션을 적용할 styleId 배열 (정렬됨)
        const paginatedGroups = rankedGroups.slice((page - 1) * pageSize, page * pageSize);
        const styleIds = paginatedGroups.map(group => group.styleId);

        // 3. ID 목록에 해당하는 Style 데이터를 가져오기
        const styleList = await prisma.style.findMany({
            where: {
                id: { in: styleIds },
            },
            select: {
                id: true,
                nickname: true,
                title: true,
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
        });

        // 4. Style 데이터와 평균 점수를 합치기
        const ratingAvgMap = new Map(paginatedGroups.map((group) => [group.styleId, group._avg[rankBy]]));
        let ranking = 1; // ranking 값 저장용
        const data = styleIds.map((id) => { // Ids는 순서를 이용하여 데이터를 형식에 맞게 생성
            const style = styleList.find((style) => style.id === id);

            style.ranking = ranking++;
            style.rating = Math.round(ratingAvgMap.get(id) * 10) / 10; // 소수점 첫째자리까지 반올림
            style.curationCount = style._count.curation;
            style._count = undefined;
            style.categories = convertCategoriesForRes(style.categories);
            style.tags = style.tags.map(({ tagname }) => tagname);
            style.thumbnail = style.imageUrls[0];
            style.imageUrls = undefined;
            return style;
        });

        // 5. 전체 아이템 개수 및 페이지 수 계산
        const totalItemCount = rankedGroups.length;
        const totalPages = Math.ceil(totalItemCount / pageSize);

        // 6. 최종 결과 반환
        return {
            currentPage: parseInt(page),
            totalPages,
            totalItemCount,
            data,
        };
    };
}

export default new RankingService();
