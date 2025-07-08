import { prisma } from '../utils/prismaInstance.js';
import { hashPassword, checkPassword } from '../utils/passwordHash.js';
import { AppError, ForbiddenError, NotFoundError } from '../utils/appError.js';

const curationService = {
    createCuration: async (curationBody, styleId) => {
        const curation = await prisma.curation.create({
            data: {
                // 비밀번호를 해싱하여 저장
                password: hashPassword(curationBody.password),
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
        if (!curation) { throw new NotFoundError(); }
        return curation;
    },
    updateCuration: async (curationId, password, curationBody) => {
        const curationPassword = await prisma.curation.findUnique({
            where: { id: curationId },
            select: { password: true },
        })
        // 비밀번호가 없거나 일치하지 않는 경우 예외 처리
        if (!curationPassword) { throw new Error(); }
        // 입력한 비밀번호와 해싱된 비밀번호를 비교
        if (!checkPassword(password, curationPassword.password)) { throw new Error(); }
      
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
    deleteCuration: async (curationId, password) => {
        const curationPassword = await prisma.curation.findUnique({
            where: { id: curationId },
            select: { password: true },
        });
        // 비밀번호가 없거나 일치하지 않는 경우 예외 처리
        if (!curationPassword) { throw new Error(); }
        // 입력한 비밀번호와 해싱된 비밀번호를 비교
        if (!checkPassword(password, curationPassword.password)) { throw new Error(); }

        await prisma.curation.delete({
            where: { id: curationId },
        });
    },
    getCurationList: async (styleId, queryParams) => {
        const { page = 1, pageSize = 5, searchBy = '', keyword = '' } = queryParams;
        const skip = (page - 1) * pageSize;
        const where = keyword
            ? {
                styleId,
                [searchBy]: {
                    contains: keyword,
                    mode: 'insensitive',
                }
            } : { styleId };

        let curations = await prisma.curation.findMany({
            where,
            orderBy: { id: 'asc' },
            skip,
            take: pageSize,
            select: {
                id: true,
                nickname: true,
                content: true,
                trendy: true,
                personality: true,
                practicality: true,
                costEffectiveness: true,
                createdAt: true,
                comment: {
                    select: {
                        id: true,
                        nickname: true,
                        content: true,
                        createdAt: true,
                    }
                },
            },
        });

        if (!curations) { throw new NotFoundError(); }
        curations = curations.map(curation => ({
            ...curation,
            comment: curation.comment || {},
        }));
        const totalCount = await prisma.curation.count({ where });
        const totalPages = Math.ceil(totalCount / pageSize);


        const curationList = {
            currentPage: page,
            totalPages,
            totalItemCount: totalCount,
            data: curations,
        }
        return curationList;
    }
};

export default curationService;