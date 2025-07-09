import CommentService from '../services/commentService.js'

class CommentControllers{
  createComment = async (req, res) => {
    const curationId = parseInt(req.params.curationId);

    const { content, password } = req.body;

    const commentBody = {
      content,
      password,
      curationId,
    }

    const comment = await CommentService.createComment(commentBody);
    return res.status(200).json(comment);
  };

  updateComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const curationId = parseInt(req.params.curationId, 10);
    const { content, password } = req.body;
    const commentBody = {
      content,
      password,
      commentId,
      curationId,
    }
    const comment = await CommentService.updateComment(commentBody)
    return res.status(200).json(comment);
  };

  deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId)
    const curationId = parseInt(req.params.curationId, 10);
    const { password } = req.body;

    const commentBody = {
      password,
      commentId,
      curationId,
    }
    const comment = await CommentService.deleteComment(commentBody)
    return res.status(200).json({ message: "답글 삭제 성공" });
  };
}

export default new CommentControllers();