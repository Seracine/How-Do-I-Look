import { prisma } from '../utils/prismaInstance.js';
import { checkPassword } from '../utils/passwordHash.js';
import { ForbiddenError, NotFoundError, ValidationError } from '../utils/appError.js';

const commentService = {
    createComment: async (commentBody) => {
        const { content, password, curationId } = commentBody
        const curation = await prisma.curation.findUnique({
            where: { id: curationId },
            include: {
                Style: true,
            },
        });

        const isMatch = checkPassword(password, curation.Style.password);
        if (!isMatch) { throw new ForbiddenError(); }

        const nickname = curation.Style.nickname;

        const comment = prisma.comment.create({
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
        return comment;
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
        if (!comment) { throw new NotFoundError('존재하지 않습니다'); }
        if (!content) { throw new ValidationError('잘못된 요청입니다'); }

        const isMatch = checkPassword(password, comment.curation.Style.password);
        if (!isMatch) { throw new ForbiddenError('비밀번호가 틀렸습니다'); }

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
        const { content, password, commentId } = commentBody;
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

        if (!comment) { throw new NotFoundError(); }
        if (!content) { throw new ValidationError(); }

        const isMatch = checkPassword(password, comment.curation.Style.password);
        if (!isMatch) { throw new ForbiddenError(); }

        return prisma.comment.delete({
            where: { id: commentId },

        })
    }
}

export default commentService