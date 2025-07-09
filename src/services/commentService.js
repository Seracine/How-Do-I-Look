import { prisma } from '../utils/prismaInstance.js';
import { checkPassword } from '../utils/passwordHash.js';
import { ValidationError, ForbiddenError, NotFoundError } from '../utils/appError.js';

class CommentService {
    createComment = async (curationId,commentBody) => {
        const { content, password } = commentBody
        const curation = await prisma.curation.findUnique({
            where: { id: curationId },
            select: {
                comment: true,
                Style: {
                    select: {
                        password: true,
                        nickname: true,
                    }
                }
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

    updateComment = async (curationId, commentBody) => {
        const { content, password, commentId } = commentBody
        if (curationId) { throw new ValidationError() };
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
            select: {
                curation: {
                    select: {
                        Style: {
                            select: {
                                password: true,
                                nickname: true
                            }
                        }
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

    deleteComment = async (curationId, commentBody) => {
        const { password, commentId } = commentBody;
        if (curationId) { throw new ValidationError() };
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
            },
            select: {
                curation: {
                    select: {
                        Style: {
                            select: {
                                password: true,
                            }
                        }
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