import commentService from '../services/commentService.js'

const commentControllers = {
  createComment: async (req, res) => {
    const curationId = parseInt(req.params.curationId);

    const { content, password } = req.body;

    const commentBody = {
      content,
      password,
      curationId,
    }

    const comment = await commentService.createComment(commentBody);

    if (!comment || !comment.content || !comment.id) {
      return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
    return res.status(200).json(comment);
  },

  updateComment: async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const { content, password } = req.body;
    
    const commentBody = {
      content,
      password,
      commentId,
    }

    try {
      const comment = await commentService.updateComment(commentBody)
      return res.status(200).json(comment);
    } catch (error) {
      if (error.message === 'comment not found') {
        return res.status(404).json({ message: '존재하지 않습니다' });
      } else if (error.message === 'Invalid password') {
        return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
      } else {
        return res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },

  deleteComment: async (req, res) => {
    const commentId = parseInt(req.params.commentId)
    const { password } = req.body;

    const commentBody = {
      password,
      commentId
    }

    try {
      const comment = await commentService.deleteComment(commentBody)
      return res.status(200).json({ "message": "답글 삭제 성공" });
    } catch (error) {
      if (error.message === 'comment not found') {
        return res.status(404).json({ message: '존재하지 않습니다' });
      } else if (error.message === 'Invalid password') {
        return res.status(403).json({ message: '비밀번호가 틀렸습니다' });
      } else {
        return res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  }
}

export default commentControllers;
