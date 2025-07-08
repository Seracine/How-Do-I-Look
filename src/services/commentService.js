import { prisma } from '../utils/prismaInstance.js';

const commentService = {
    createComment: async (commentBody) => {
        const { content, password, curationId } = commentBody
        const curation = await prisma.curation.findUnique({
            where: { id: curationId },
            include: {
                Style: true,
            },
        });
        const nickname = curation.Style.nickname;

        if (curation.Style.password !== password) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return prisma.comment.create({
            data: {
                content: content,
                nickname: nickname,
                curation: { connect: { id: curationId } }
            },
            select: {
                id: true,
                nickname: true,
                content: true,
            }
        });
    },

    updateComment: async (commentBody) => {
        const { content, password, commentId } = commentBody
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            include: {
                curation: {
                    include: {
                        Style: true,
                    }
                }
            },
        });
        if (!comment) {
            throw new Error('comment not found');
        }
        if (comment.curation.Style.password !== password) {
            throw new Error('Invalid password');
        }

        return prisma.comment.update({
            where: { id: commentId },
            data: {
                content: content,
            },
            select: {
                id: true,
                nickname: true,
                content: true,
            }
        })
    },

    deleteComment: async (commentBody) => {
        const { password, commentId } = commentBody;
        const comment = await prisma.comment.findUnique({
            where: { id: commentId }, 
            include: {
                curation: {
                    include: {
                        Style: true,
                    }
                }
            },
        });

        if (!comment) {
            throw new Error('comment not found');
        }
        if (comment.curation.Style.password !== password) {
            throw new Error('Invalid password');
        }

        return prisma.comment.delete({
            where: { id: commentId },

        })
    }
}

export default commentService