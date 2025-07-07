import commentService from '../services/commentService.js'

const commentControllers = {
  createComment: async (req, res) => {
    const curationId = parseInt(req.params.id);
    const { content, password } = req.body;
    const hash = password;

    const commentBody = {
      content,
      password: hash,
      curationId,
    }

    const comment = await commentService.createComment(commentBody);

    return res.status(201).json({ comment });
  },

  updateComment: async (req, res) => {
    try {
      const commentId = parseInt(req.params.id);
      const { content, password } = req.body;
      const hash = password;

      const commentBody = {
        content,
        password: hash,
        commentId,
      }
      const comment = await commentService.updateComment(commentBody)

      return res.status(200).json({ comment });
    } catch (error) {
      console.log('Error:',error);
      if (error.message === 'comment not found') {
        res.status(404).send({ message: '존재하지 않습니다' });
      } else if (error.message === 'Invalid password') {
        res.status(403).send({ message: '비밀번호가 틀렸습니다' });
      } else {
        res.status(400).send({ message: '잘못된 요청입니다' });
      }
    };
  }
}

  export default commentControllers;





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