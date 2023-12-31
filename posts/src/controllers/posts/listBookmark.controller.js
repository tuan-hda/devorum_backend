const { getUserProducer } = require('../../broker/userProducer')
const PostModel = require('../../models/Post')

module.exports = async (req, res, next) => {
    try {
        console.log(' req.user.username ', req.user.username)
        const data = await PostModel.find({ bookmark: req.user.username })

        const ids = data.map((post) => post.user) || []
        const users = await getUserProducer({ id: ids })

        const posts = data.map((post) => ({
            ...post.toObject(),
            user: users?.find((user) => user._id === post.user),
        }))
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}
