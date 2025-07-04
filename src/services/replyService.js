import { prisma } from '../utils/prismaInstance.js';

const ReplyService = {
    createReply: async ({ curationId, content, password }) => {
        const curation = await prisma.curation.findUnique({
            where: { id: Number(curationId) },
            include: {
                Style: true,
                comment: true,
            },
        });

        if (curation?.comment) {
            throw new Error('COMMENT_ALREADY_EXISTS')
        } else if (curation.Style.password !== password) {
            throw new Error('INVALID_USER')
        }

        return prisma.reply.create({
            data: {
                content: content,
                curation: { connect: { id: Number(curationId) } }
            },
            include: {
                curation: {
                    include: {
                        Style: {
                            select: {
                                nickname: true
                            }
                        }
                    }
                }
            }
        })
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

export default ReplyService