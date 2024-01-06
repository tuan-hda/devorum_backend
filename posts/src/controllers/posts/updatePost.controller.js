const PostModel = require('../../models/Post')
const createHttpError = require('http-errors')
const client = require('../../services/recombee')
const recombee = require('recombee-api-client')
const rqs = recombee.requests

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

        const postData = await PostModel.findByIdAndUpdate(_id, update)
        const updatedPost = await PostModel.findById(_id)

        if (!postData) {
            throw createHttpError[500]('Internal server error')
        }

        res.status(200).json(postData)

        client
            .send(
                new rqs.SetItemValues(
                    updatedPost._id,
                    {
                        type: 'post',
                        title: updatedPost.title,
                        community: updatedPost.community,
                        tags: updatedPost.tags,
                        content: updatedPost.content,
                        state: updatedPost.state,
                    },
                    {
                        // optional parameters:
                        cascadeCreate: true,
                    }
                )
            )
            .then((response) => {
                //handle response
            })
            .catch((error) => {
                console.log('Recombee error', error)
            })
    } catch (error) {
        next(error)
    }
}

module.exports = updatePost
