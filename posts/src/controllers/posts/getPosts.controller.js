const { getUserProducer } = require('../../broker/userProducer')
const PostModel = require('../../models/Post')

const getPosts = async (req, res, next) => {
    try {
        const user = req.user
        const { page, size, community, state } = req.query
        const { limit, offset } = getPagination(page, size)

        const condition = {}

        if (!user || (user._id !== 'admin' && user.role !== 'admin')) {
            condition.state = 'accepted'
        }

        if (community) condition.community = community
        if (state) condition.state = state
        // Posts and users
        const data = await PostModel.paginate(condition, {
            offset,
            limit,
            populate: ['comments'],
        })

        const ids = data.docs.map((post) => post.user) || []
        const users = await getUserProducer({ id: ids })

        const posts = data.docs.map((post) => ({
            ...post.toObject(),
            user: users?.find((user) => user._id === post.user),
        }))

        const result = {
            totalItems: data.totalDocs,
            posts: posts,
            totalPages: data.totalPages,
            currentPage: data.page,
        }

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const getPagination = (page, size) => {
    const limit = size ? +size : 10
    const offset = page ? (page - 1) * limit : 0

    return { limit, offset }
}

module.exports = getPosts
