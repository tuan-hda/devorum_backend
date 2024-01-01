const { getUserProducer } = require('../../broker/userProducer')
const PostModel = require('../../models/Post')

const listSelfPosts = async (req, res, next) => {
    try {
        const user = req.user
        const condition = {
            user: user._id,
        }
        const data = await PostModel.find(condition)

        const ids = data.map((post) => post.user) || []
        const users = await getUserProducer({ id: ids })

        const posts = data.map((post) => ({
            ...post.toObject(),
            user: users?.find((user) => user._id === post.user),
        }))

        const result = {
            posts: posts,
        }

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = listSelfPosts
