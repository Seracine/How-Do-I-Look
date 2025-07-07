import { prisma } from '../utils/prismaInstance.js';

const replyService = {
    createReply: async ({ curationId, content, password }) => {
        const curation = await prisma.curation.findUnique({
            where: { id: Number(curationId) },
            select: {
                Style: true,
                content: true,
                nickname: true,
            },
        });

        if (curation?.content) {
            throw new Error('답글 내용이 존재합니다.')
        } else if (curation.styleId.password !== password) {
            throw new Error('유효하지 않은 사용자입니다.')
        }

        return prisma.reply.create({
            data: {
                content: content,
                curation: { connect: { id: Number(curationId) } }
            },
            select: {
                id: true,
                curation: {
                    select: {
                        Style: {
                            select: {
                                nickname: true
                            }
                        }
                    }
                },
                content: true,
                createdAt: true,
            }
        }). then(reply => ({
            id: reply.id,
            nickname: reply.curation.Style.nickname,
            content: reply.content,
            createdAt: reply.createdAt
        }));
    },
    updateReply: async ({ replyId, content, password, curationId }) => {
        const curation = await prisma.curation.findUnique({
            where: { id: Number(curationId) },
            include: {
                Style: true,
                comment: true,
            },
        });
        if (curation.Style.password !== password) {
            throw new Error('INVALID_USER')
        }

        return prisma.reply.update({
            where: { id: replyId },
            data: {
                content: content,
                curation: { connect: { id: Number(curationId) } }
            },
            select: {
                id: true,
                curation: {
                    select: {
                        Style: {
                            select: {
                                nickname: true
                            }
                        }
                    }
                },
                content: true,
                createdAt: true,
            }
        })
    }
}

export default replyService