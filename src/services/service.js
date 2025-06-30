// import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const reply = await prisma.reply.create({
      data: {
        content,
        password: hash,
        comment: { connect: { id: Number(commentId) } }
      },
      include: {
        user: { select: { nickname: true } }
      }
  });

  

