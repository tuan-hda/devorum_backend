const { getCommunityProducer } = require('../../broker/communityProducer')
const PostModel = require('../../models/Post')
const TagModel = require('../../models/Tag')

const createPost = async (req, res, next) => {
    try {
        const user = req.user
        const { title, content, tags } = req.body
        const community = req.body.community

        let state = 'accepted'

        if (community) {
            const communityData = await getCommunityProducer({ name: community })
            if (communityData && communityData[0]?.scrutinizeToPost) {
                state = 'pending'
            }
        }

        const data = {
            user: user._id,
            title,
            content,
            tags,
            community: req.body.community,
            state,
        }

        const post = await PostModel.create(data)

        return res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}
module.exports = createPost
