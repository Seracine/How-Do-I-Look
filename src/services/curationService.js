import { prisma } from '../utils/prismaInstance.js';

export const createCuration = async (curationBody, styleId) => {
    const curation = await prisma.curation.create({
        data: {
            ...curationBody,
            Style: { connect: { id: styleId } },
        },
        select:{
            nickname: true,
            content: true,
            password: true,
            trendy: true,
            personality: true,
            practicality: true,
            costEffectiveness: true,
        },
    });
    return curation;
}