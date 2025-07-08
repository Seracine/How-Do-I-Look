import commentService from '../services/commentService.js'

const commentControllers = {
  createComment: async (req, res, next) => {
    const curationId = parseInt(req.params.curationId);

    const { content, password } = req.body;

    const commentBody = {
      content,
      password,
      curationId,
    }

    const comment = await commentService.createComment(commentBody);
    return res.status(200).json(comment);
  },

  updateComment: async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const curationId = parseInt(req.params.curationId, 10);
    const { content, password } = req.body;
    const commentBody = {
      content,
      password,
      commentId,
      curationId,
    }
    const comment = await commentService.updateComment(commentBody)
    return res.status(200).json(comment);
  },

  deleteComment: async (req, res) => {
    const commentId = parseInt(req.params.commentId)
    const curationId = parseInt(req.params.curationId, 10);
    const { password } = req.body;

    const commentBody = {
      password,
      commentId,
      curationId,
    }
    const comment = await commentService.deleteComment(commentBody)
    return res.status(200).json({ message: "답글 삭제 성공" });
  }
}

export default commentControllers;