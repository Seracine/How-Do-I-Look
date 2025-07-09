import { prisma } from '../utils/prismaInstance.js';
import { hashPassword, checkPassword } from '../utils/passwordHash.js';
import { ForbiddenError, NotFoundError, ValidationError } from '../utils/appError.js';

class CurationService {
    createCuration = async (styleId, curationBody) => {
        const curationField = curationBody
        const curation = await prisma.curation.create({
            data: {
                ...curationField,
                // 비밀번호를 해싱하여 저장
                password: hashPassword(curationBody.password),
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
    };

    updateCuration = async (curationId, styleId, curationBody) => {
        if (styleId) { throw new ValidationError(); }
        const { password, ...curationField } = curationBody;
        const curationPassword = await prisma.curation.findUnique({
            where: { id: curationId },
            select: { password: true },
        })

        console.log(curationPassword);

        // 비밀번호가 없거나 일치하지 않는 경우 예외 처리
        if (!curationPassword) { throw new NotFoundError(); }
        // 입력한 비밀번호와 해싱된 비밀번호를 비교1
        if (!checkPassword(password, curationPassword.password)) { throw new ForbiddenError(); }

        const curation = await prisma.curation.update({
            where: { id: curationId },
            data: curationField,
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
    };

    deleteCuration = async (curationId, curationBody) => {
        if (styleId) { throw new ValidationError(); }
        const password = curationBody.password;
        const curationPassword = await prisma.curation.findUnique({
            where: { id: curationId },
            select: { password: true },
        });

        // 비밀번호가 없거나 일치하지 않는 경우 예외 처리
        if (!curationPassword) { throw new NotFoundError(); }
        // 입력한 비밀번호와 해싱된 비밀번호를 비교
        if (!checkPassword(password, curationPassword.password)) { throw new ForbiddenError(); }

        await prisma.curation.delete({ where: { id: curationId } });
    };

    getCurationList = async (styleId, queryParams) => {
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
        const totalCount = prisma.curation.count({ where });
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

export default new CurationService();