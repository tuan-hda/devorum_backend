const { getCommunityProducer } = require('../../broker/communityProducer')
const PostModel = require('../../models/Post')
const TagModel = require('../../models/Tag')
const client = require('../../services/recombee')
const recombee = require('recombee-api-client')
const rqs = recombee.requests

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

        res.status(200).json(post)

        client
            .send(
                new rqs.SetItemValues(
                    post._id,
                    {
                        type: 'post',
                        title: post.title,
                        community: post.community,
                        tags: post.tags,
                        content: post.content,
                        state: post.state,
                        author: user.username,
                        createdAt: post.createdAt,
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
                //handle error
            })
    } catch (error) {
        next(error)
    }
}
module.exports = createPost
