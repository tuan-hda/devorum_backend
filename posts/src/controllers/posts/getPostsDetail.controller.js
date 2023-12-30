const { getUserProducer } = require('../../broker/userProducer')
const PostModel = require('../../models/Post')

const getPosts = async (req, res, next) => {
    try {
        // Posts and users
        const data = await PostModel.findById(req.params.id)

        res.status(200).json({
            ...data.toObject(),
            user: (await getUserProducer({ id: data.user }))[0],
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getPosts
