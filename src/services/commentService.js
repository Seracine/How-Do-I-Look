import { prisma } from '../utils/prismaInstance.js';

const commentService = {
    createComment: async (commentBody) => {
        const { curationId, content, password } = commentBody
        const curation = await prisma.curation.findUnique({
            where: { id: Number(curationId) },
            include: {
                Style: true,
            },
        });
        if (curation.password !== password) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return prisma.comment.create({
            data: {
                content: content,
                nickname: '1',
                curation: { connect: { id: Number(curationId) } }
            },
            select: {
                id: true,
                nickname: true,
                content: true,
            }
        });
    },

    updateComment: async (commentBody) => {
        const { commentId, content, password } = commentBody
        const comment = await prisma.comment.findUnique({
            where: { id: Number(commentId) },
            include: {
                curation: {
                    include: {
                        Style: true
                    }
                }
            },
        });
        

        return prisma.comment.update({
            where: { id: Number(commentId) },
            data: {
                content: content,
            },
            select: {
                id: true,
                nickname: true,
                content: true,
            }
        })
    }
}

export default commentService