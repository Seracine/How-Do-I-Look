import { PrismaClient, CATEGORY } from '@prisma/client';
import { convertCategoryToEnumType } from '../src/utils/convertToEnum.js';
import {
    mockTags,
    mockStyles,
    mockCategoriesRaw,
    mockCurationRaw,
} from './mock.js';

const prisma = new PrismaClient();

// string을 CATEGORY enum으로 변환하는 헬퍼 함수
function getCategoryEnum(typeString) {
    if (Object.values(CATEGORY).includes(typeString)) {
        return CATEGORY[typeString];
    }
    throw new Error(`Invalid CATEGORY type string: ${typeString}`);
}

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
                tags: {
                    connectOrCreate: (styleData.tags || []).map(tagname => ({
                        where: { tagname: tagname },
                        create: { tagname: tagname },
                    })),
                },
            },
        });
        createdStyles.push(style);
    }
    console.log(`Created ${createdStyles.length} styles.`);

    // 3. Category 데이터 생성
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
                ...(curationRaw.replyContent && {
                    comment: {
                        create: { content: curationRaw.replyContent },
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