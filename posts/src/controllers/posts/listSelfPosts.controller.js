const { getUserProducer } = require('../../broker/userProducer')
const PostModel = require('../../models/Post')

const listSelfPosts = async (req, res, next) => {
    try {
        const currentUser = req.user
        const user = (await getUserProducer({ username: req.params.username }))[0]
        console.log('user data from list self post', user)
        const condition = {
            user: user._id,
        }

        if (currentUser._id !== user._id) {
            condition.state = 'accepted'
        }

        const data = await PostModel.find(condition).sort({ createdAt: -1 })

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
