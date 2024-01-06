const PostModel = require('../../models/Post')
const createHttpError = require('http-errors')
const client = require('../../services/recombee')
const recombee = require('recombee-api-client')
const rqs = recombee.requests
const toggleVote = async (req, res, next) => {
    try {
        const user = req.user
        const { _id } = req.body

        const post = await PostModel.findById(_id)

        if (!post) {
            throw createHttpError[404]('Not found')
        }

        if (post.votes.includes(user._id)) {
            post.votes = post.votes.filter((userId) => userId !== user._id)
            client.send(new rqs.DeleteRating(user.username, req.body._id), (err, response) => {
                //...
            })
        } else {
            post.votes.push(user._id)
            client.send(
                new rqs.AddRating(user.username, req.body._id, 1.0, {
                    cascadeCreate: true,
                }),
                (err, response) => {
                    //...
                }
            )
        }

        await post.save()

        res.status(200).json(post.votes)
    } catch (error) {
        next(error)
    }
}

module.exports = toggleVote
