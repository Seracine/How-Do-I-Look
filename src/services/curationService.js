import { prisma } from '../utils/prismaInstance.js';

const curationService = {
    createCuration: async (curationBody, styleId) => {
        const curation = await prisma.curation.create({
            data: {
                ...curationBody,
                Style: { connect: { id: styleId } },
            },
            select: {
                id: true,
                nickname: true,
                content: true,
                trendy: true,
                personality: true,
                practicality: true,
                costEffectiveness: true,
                createdAt: true,
            },
        });
        return curation;
    },
    updateCuration: async (curationId, password, curationBody) => {
        const curationPassword = await prisma.curation.findUnique({
            where: { id: curationId },
            select: { password: true },
        })
        // 비밀번호가 없거나 일치하지 않는 경우 예외 처리
        if (!curationPassword) { throw new Error('Curation not found'); }
        if (curationPassword.password !== password) { throw new Error('Invalid password'); }

        const curation = await prisma.curation.update({
            where: { id: curationId },
            data: curationBody,
            select: {
                id: true,
                nickname: true,
                content: true,
                trendy: true,
                personality: true,
                practicality: true,
                costEffectiveness: true,
                createdAt: true,
            },
        });
        return curation;
    },
};

export default curationService;