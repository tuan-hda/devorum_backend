const { getUserProducer } = require('../broker/userProducer')
const CommentModel = require('../models/Comment')

module.exports.createCommentController = async (req, res, next) => {
    try {
        const user = req.user
        const comment = new CommentModel({
            author: user.username,
            content: req.body.content,
            postId: req.body.postId,
            replyTo: req.body.replyTo,
        })

        await comment.save()
        res.status(201).json(comment)
    } catch (error) {
        next(error)
    }
}

module.exports.listCommentsController = async (req, res, next) => {
    try {
        const populateComments = async (comment) => {
            comment = comment.toObject()
            let replies = await CommentModel.find({ replyTo: comment._id })
            for (let i = 0; i < replies.length; i += 1) {
                replies[i] = await populateComments(replies[i])
            }
            comment.replies = replies || []
            return comment
        }

        const postId = req.params.postId
        let comments = await CommentModel.find({ postId, replyTo: null })
        for (let i = 0; i < comments.length; i += 1) {
            comments[i] = await populateComments(comments[i])
        }

        res.status(200).json({ total: await CommentModel.countDocuments({ postId: postId }), comments: comments })
    } catch (error) {
        next(error)
    }
}

module.exports.updateCommentController = async (req, res, next) => {
    try {
        const commentId = req.params.commentId
        await CommentModel.updateOne(
            {
                _id: commentId,
            },
            {
                content: req.body.content,
            }
        )
        res.status(200).json({
            msg: 'Updated successfully',
        })
    } catch (error) {
        next(error)
    }
}

module.exports.deleteCommentController = async (req, res, next) => {
    try {
        const deleteSubComment = async (comment) => {
            let replies = await CommentModel.find({ replyTo: comment._id })
            for (let i = 0; i < replies.length; i += 1) {
                await deleteSubComment(replies[i])
            }
            await comment.deleteOne()
        }

        const comment = await CommentModel.findById(req.params.commentId)
        await deleteSubComment(comment)
        await comment.deleteOne()

        res.status(200).json({
            msg: 'Deleted successfully',
        })
    } catch (error) {
        next(error)
    }
}

module.exports.voteCommentController = async (req, res, next) => {
    try {
        const user = req.user
        const comment = await CommentModel.findById(req.params.commentId)
        if (comment.votes.includes(user.username)) {
            await CommentModel.updateOne(
                {
                    _id: req.params.commentId,
                },
                {
                    $pull: {
                        votes: user.username,
                    },
                }
            )
            res.status(200).json({
                msg: 'Unvoted successfully',
            })
        } else {
            await CommentModel.updateOne(
                {
                    _id: req.params.commentId,
                },
                {
                    $addToSet: {
                        votes: user.username,
                    },
                }
            )
            res.status(200).json({
                msg: 'Voted successfully',
            })
        }
    } catch (error) {
        next(error)
    }
}
