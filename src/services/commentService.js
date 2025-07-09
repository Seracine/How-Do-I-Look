import { prisma } from '../utils/prismaInstance.js';
import { checkPassword } from '../utils/passwordHash.js';
import { ValidationError, ForbiddenError, NotFoundError } from '../utils/appError.js';

class CommentService {
    createComment = async (commentBody) => {
        const { content, password, curationId } = commentBody
        const curation = await prisma.curation.findUnique({
            where: { id: curationId },
            include: {
                Style: {
                    select: {
                        password: true,
                        nickname: true,
                    }
                },
                comment: true,
            },
        });
        if (curation.comment) { throw new ValidationError(); }
        const isMatch = checkPassword(password, curation.Style.password);
        if (!isMatch) { throw new ForbiddenError(); }

        const comment = await prisma.comment.create({
            data: {
                content: content,
                nickname: curation.Style.nickname,
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
    };

    updateComment = async (commentBody) => {
        const { content, password, commentId, curationId } = commentBody
        if (curationId) { throw new ValidationError() };
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                curation: {
                    include: {
                        Style: {
                            select: {
                                password: true,
                                nickname: true,
                            }
                        },
                    }
                }
            },
        });
        if (!comment) { throw new NotFoundError(); }
        const isMatch = checkPassword(password, comment.curation.Style.password);
        if (!isMatch) { throw new ForbiddenError(); }

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
    };

    deleteComment = async (commentBody) => {
        const { password, commentId, curationId } = commentBody;
        if (curationId) { throw new ValidationError() };
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
            include: {
                curation: {
                    include: {
                        Style: {
                            select: {
                                password: true,
                            }
                        },
                    }
                }
            },
        });

        if (!comment) { throw new NotFoundError(); }
        const isMatch = checkPassword(password, comment.curation.Style.password);
        if (!isMatch) { throw new ForbiddenError(); }

        await prisma.comment.delete({
            where: { id: commentId },
        })
    };
}

export default new CommentService();