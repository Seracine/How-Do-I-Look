import bcrypt from 'bcrypt'; // npm install bcrypt --save 실행 필수
import { prisma } from '../prismaClient.js';

export const addReply = async (req, res) => {
  try {
    const { content, password } = req.body;
    const { commentId } = req.params;

    if (!content?.trim() || !password?.trim())
      return res.status(400).json({error:'내용과 비밀번호를 모두 입력하시오.'});

    const hash = await bcrypt.hash(password, 10);

    const reply = await prisma.reply.create({
      data: {
        content,
        password: hash,
        comment: { connect: { id: Number(commentId) } },
      },
      include: {
        user: { select: { nickname: true } },
      }
    })

    return res.status(201).json({
      id:        reply.id,
      nickname:  reply.user.nickname,
      content:   reply.content,
      createdAt: reply.createdAt
    });
  } catch (e) {
    return res
      .status(400)
      .json({ message: '잘못된 요청입니다.' });
  }
};

