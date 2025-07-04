import { convertCategoryToEnumType } from '../src/utils/convertToEnum.js';
import { prisma } from '../src/utils/prismaInstance.js';
import {
    mockTags,
    mockStyles,
    mockCategoriesRaw,
    mockCurationRaw,
} from './mock.js';

async function main() {
    console.log('--- Seeding mock data ---');
    // 1. Tag 데이터 생성
    const tags = await Promise.all(
        mockTags.map(data => prisma.tag.upsert({
            where: { tagname: data.tagname },
            update: { count: (data.count || 0) },
            create: data,
        }))
    );
    console.log(`Created ${tags.length} tags.`);

    // 2. Style 데이터 생성
    const createdStyles = [];
    for (const styleData of mockStyles) {
        const style = await prisma.style.create({
            data: {
                nickname: styleData.nickname,
                password: styleData.password,
                title: styleData.title,
                content: styleData.content,
                imageUrls: styleData.imageUrls,
                viewCount: styleData.viewCount,
                tags: { // 현재 생성중인 Style의 tags와 Tag의 tagname을 연결
                    connectOrCreate: (styleData.tags || []).map(tagname => ({
                        where: { tagname: tagname },
                        create: { tagname: tagname },
                    })),
                },
            },
        });
        createdStyles.push(style);
        // 각 Style의 tags에 대해 count 증가
        for(const tagname of styleData.tags || []) {
            await prisma.tag.update({
                where: { tagname: tagname },
                data: { count: { increment: 1 } },
            });
        }
    }
    console.log(`Created ${createdStyles.length} styles.`);

    // 3. Category 데이터 생성
    // Category 각 객체의 type 속성을 enum으로 변환
    // mockCategoriesRaw는 { styleId, type, name, brand, price } 형태
    const categoriesToCreate = mockCategoriesRaw.map(cat => ({
        ...cat,
        type: convertCategoryToEnumType(cat.type),
    }));

    const createdCategories = await prisma.category.createMany({ data: categoriesToCreate });
    console.log(`Created ${createdCategories.count} categories.`);

    // 4. Curation 및 Reply 데이터 생성
    const createdCurations = [];
    for (const curationRaw of mockCurationRaw) {
        const curation = await prisma.curation.create({
            data: {
                styleId: curationRaw.styleId,
                nickname: curationRaw.nickname,
                password: curationRaw.password,
                content: curationRaw.content,
                trendy: curationRaw.trendy,
                personality: curationRaw.personality,
                practicality: curationRaw.practicality,
                costEffectiveness: curationRaw.costEffectiveness,
                ...(curationRaw.replyContent && { // ...을 사용해야 comment 속성이 객체에 병합됨
                    comment: { // replyContent가 있을 때만 reply 생성
                        create: { 
                            nickname: curationRaw.replyContent.nickname,
                            content: curationRaw.replyContent.content,
                        },
                    },
                }),
            },
        });
        createdCurations.push(curation);
    }
    console.log(`Created ${createdCurations.length} curations (and some replies).`);

    console.log('--- Mock data seeding complete ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });