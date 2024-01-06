const { getUserProducer } = require('../../broker/userProducer')
const PostModel = require('../../models/Post')
var recombee = require('recombee-api-client')
const client = require('../../services/recombee')
var rqs = recombee.requests

const readNext = async (req, res, next) => {
    try {
        const user = req.user
        const { community, state } = req.query

        const options = {
            scenario: 'dev',
        }

        options.filter = `('type' == "post") and ('state' == "accepted")`

        const response = await client.send(new rqs.RecommendItemsToItem(req.params.id, user?.username, 5, options))

        const ids = response.recomms.map((post) => post.id) || []

        const condition = {
            _id: { $in: ids },
        }
        if (community) condition.community = community
        if (state) condition.state = state
        // Posts and users
        const data = await PostModel.paginate(condition, {
            offset: 0,
            limit: 100,
            populate: ['comments'],
        })

        const userIds = data.docs.map((post) => post.user) || []
        const users = await getUserProducer({ id: userIds })

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

        console.log(
            'result ids',
            result.posts.map((item) => item._id)
        )
        console.log(
            'response ids',
            response.recomms.map((item) => item.id)
        )

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = readNext
