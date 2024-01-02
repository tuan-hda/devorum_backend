const PostModel = require('../../models/Post')
const createHttpError = require('http-errors')
const client = require('../../services/recombee')
const recombee = require('recombee-api-client')
const rqs = recombee.requests
const deletePost = async (req, res, next) => {
    try {
        const user = req.user
        const id = req.params.id

        const post = await PostModel.findById(id)

        if (!post) {
            throw createHttpError[404]('Not found')
        }

        if (post.user !== user._id) {
            throw createHttpError[403]('Forbidden')
        }

        await PostModel.findByIdAndDelete({ _id: id })

        res.status(200).json({ ms: 'Delete post successfully' })
        client
            .send(new rqs.DeleteItem(id))
            .then((response) => {
                //handle response
            })
            .catch((error) => {
                //handle error
            })
    } catch (error) {
        next(error)
    }
}

module.exports = deletePost
