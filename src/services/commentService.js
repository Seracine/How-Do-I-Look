import { prisma } from '../utils/prismaInstance.js';
import { checkPassword } from '../utils/passwordHash.js';
import { AppError, ForbiddenError, NotFoundError, ValidationError } from '../utils/appError.js';

const commentService = {
    createComment: async (commentBody) => {
        const { content, password, curationId } = commentBody
        const curation = await prisma.curation.findUnique({
            where: { id: curationId },
            include: {
                Style: true,
            },
        });
        
        if (!content) { throw new ValidationError('잘못된 요청입니다'); }

        const isMatch = checkPassword(password, curation.Style.password);
        if (!isMatch) { throw new ForbiddenError('비밀번호가 틀렸습니다'); }

        const nickname = curation.Style.nickname;

        const comment = await prisma.comment.create({
            data: {
                content: content,
                nickname: nickname,
                curation: { connect: { id: curationId } }
            },
            select: {
                id: true,
                nickname: true,
                content: true,
                createdAt: true,

            }
        });
        return comment;
    },

    updateComment: async (commentBody) => {
        const { content, password, commentId, curationId } = commentBody
        const comment = await prisma.comment.findFirst({
            where: { 
                id: commentId,
                curationId: curationId,
             },
            include: {
                curation: {
                    include: {
                        Style: true,
                    }
                }
            },
        });
        if (!comment) { throw new NotFoundError('존재하지 않습니다'); }
        if (!content) { throw new ValidationError('잘못된 요청입니다'); }

        const isMatch = checkPassword(password, comment.curation.Style.password);
        if (!isMatch) { throw new ForbiddenError('비밀번호가 틀렸습니다'); }

        return await prisma.comment.update({
            where: { id: commentId },
            data: {
                content: content,
            },
            select: {
                id: true,
                nickname: true,
                content: true,
                createdAt: true,
            }
        })
    },

    deleteComment: async (commentBody) => {
        const { content, password, commentId, curationId } = commentBody;
        const comment = await prisma.comment.findFirst({
            where: { 
                id: commentId,
                curationId: curationId,
             },
            include: {
                curation: {
                    include: {
                        Style: true,
                    }
                }
            },
        });

        if (!comment) { throw new NotFoundError('존재하지 않습니다'); }
        if (!content) { throw new ValidationError('잘못된 요청입니다'); }

        const isMatch = checkPassword(password, comment.curation.Style.password);
        if (!isMatch) { throw new ForbiddenError('비밀번호가 틀렸습니다'); }

        return prisma.comment.delete({
            where: { id: commentId },

        })
    }
}

export default commentService