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
    try {
      if (!comment || !comment.content || !comment.id) {
        return res.status(200).json(comment);
      }
    } catch (error) { next(error); };
  },

  updateComment: async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const { content, password } = req.body;
    const commentBody = {
      content,
      password,
      commentId,
    }
    const comment = await commentService.updateComment(commentBody)
    return res.status(200).json(comment);
  },

  deleteComment: async (req, res) => {
    const commentId = parseInt(req.params.commentId)
    const { content, password } = req.body;

    const commentBody = {
      content,
      password,
      commentId
    }
    const comment = await commentService.deleteComment(commentBody)
    return res.status(200).json(comment);
  }
}

export default commentControllers;
