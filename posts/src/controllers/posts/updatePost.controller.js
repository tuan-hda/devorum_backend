const PostModel = require('../../models/Post')
const createHttpError = require('http-errors')

const updatePost = async (req, res, next) => {
    try {
        // const user = req.user
        const { _id, title, content, tags, closed, state } = req.body
        console.log('🚀 ~ file: updatePost.controller.js:8 ~ updatePost ~ req.body:', req.body)

        const updatedData = {
            title,
            content,
            tags,
            state,
            closed,
            closedAt: closed ? new Date() : null,
        }

        const post = await PostModel.findById(_id)

        if (!post) {
            throw createHttpError[404]('Not found')
        }

        const update = { $set: updatedData }

        const updatedPost = await PostModel.findByIdAndUpdate(_id, update)

        if (!updatedPost) {
            throw createHttpError[500]('Internal server error')
        }

        res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }
}

module.exports = updatePost
