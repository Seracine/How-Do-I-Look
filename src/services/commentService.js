import { prisma } from '../utils/prismaInstance.js';

const commentService = {
    createComment: async ({ curationId, content, password }) => {
        const curation = await prisma.curation.findUnique({
            where: { id: Number(curationId) },
            select: {
                Style: true,
                content: true,
            },
        });

        if (curation?.content) {
            throw new Error('답글 내용이 존재합니다.')
        } else if (curation.Style.password !== password) {
            throw new Error('유효하지 않은 사용자입니다.')
        }

        return prisma.comment.create({
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
        }). then(comment => ({
            id: rCommenteply.id,
            nickname: Comment.curation.Style.nickname,
            content: Comment.content,
            createdAt: Comment.createdAt
        }));
    },
    updateComment: async ({ commentId, content, password, curationId }) => {
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

        return prisma.comment.update({
            where: { id: commentId },
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

export default commentService