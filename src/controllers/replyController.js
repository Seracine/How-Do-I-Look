import replyService from '../services/replyService.js'
import { prisma } from '../utils/prismaInstance.js';

const replyControllers = {
  createReply: async (req, res) => {
    try {
      const { content, password, curationId } = req.body;
      const hash = password;
      const reply = await replyService.createReply({
        content,
        password: hash,
        curationId,
      })

      return res.status(201).json({
        id: reply.id,
        nickname: reply.curation?.Style?.nickname || '익명',
        content: reply.content,
        createdAt: reply.createdAt
      });
    } catch (error) {
      console.error("Reply creation error:", error);
      if (error.message === "Bad Request") {
        error.status = 400
        error.message = '잘못된 요청입니다.'
      }
      return res.status(error.status).json({ message: error.message })
    }
  },

  updateReply: async (req, res) => {
    const replyId = parseInt(req.params.id);
    const { content, password, curationId } = req.body;
    const hash = password;

    const reply = await replyService.updateReply({
      replyId,
      content,
      password: hash,
      curationId,
    })

    return res.status(201).json({
      id: reply.id,
      nickname: reply.curation?.Style?.nickname || '익명',
      content: reply.content,
      createdAt: reply.createdAt
    });
  }
}

export default replyControllers;





/* import replyService from '../services/replyService.js'

export const replyControllers = async (req, res) => {
  try {
    const { content, password } = req.body;
    const { commentId } = req.params;
    
    // 1. 입력 검증
    if (!content?.trim() || !password?.trim())
      return res.status(400).json({error:'내용과 비밀번호를 모두 입력하시오.'});
    
    const commentIdNum = Number(commentId);
    if (isNaN(commentIdNum)) {
      return res.status(400).json({ error: '유효하지 않은 댓글 ID입니다.' });
    }

    if (content.trim().length > 300) {
      return res.status(400).json({ error: '답글은 300자 이내로 작성해주세요.' });
    }

    // 2. 보안 처리
    const hash = await bcrypt.hash(password, 10);
    const cleanContent = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} }); // 사용할지 말지 고민중...

    // 3. DB 저장
    const reply = await prisma.reply.create({
      data: {
        content: cleanContent,
        password: hash,
        comment: { connect: { id: Number(commentId) } },
      },
      include: {
        user: { select: { nickname: true } },
      }
    })

    // 4. 응답 개선
    res.setHeader('Location', `/comments/${commentId}/replies/${reply.id}`);
    return res.status(201).json({
      id:        reply.id,
      nickname: reply.user?.nickname || '익명', // user가 null일 때 대비       
      content:   reply.content,
      createdAt: reply.createdAt
    });
  } catch (error) {
  console.error("Reply creation error:", error);
  if (e.code === 'P2025') {
    return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
  }
  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(500).json({ message: '데이터베이스 관련 오류가 발생했습니다.' });
    }
  res.status(500).json({ message: '서버 내부 오류' });
}
};

 */