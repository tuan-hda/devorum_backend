const express = require('express')
const router = express.Router()
const { authenticateJWT } = require('../middlewares/auth.middleware')
const {
    createCommentController,
    deleteCommentController,
    listCommentsController,
    updateCommentController,
    voteCommentController,
} = require('../controllers/comments.controller')

router.post('/', authenticateJWT, createCommentController)
router.get('/:postId', listCommentsController)
router.put('/:commentId', authenticateJWT, updateCommentController)
router.delete('/:commentId', authenticateJWT, deleteCommentController)
router.put('/:commentId/vote', authenticateJWT, voteCommentController)

module.exports = router
