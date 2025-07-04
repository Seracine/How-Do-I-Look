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
        }

        if (curation.Style.password !== password) {
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
    }
}

export default ReplyService