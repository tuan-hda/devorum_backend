const { getCommunityProducer } = require('../../broker/communityProducer')
const { getUserProducer } = require('../../broker/userProducer')
const PostModel = require('../../models/Post')

const getPosts = async (req, res, next) => {
    try {
        // Posts and users
        const data = await PostModel.findById(req.params.id)

        const finalData = {
            ...data.toObject(),
            user: (await getUserProducer({ id: data.user }))[0],
        }
        if (finalData.community) {
            finalData.communityData = (await getCommunityProducer({ name: data.community }))[0]
        }

        res.status(200).json(finalData)
    } catch (error) {
        next(error)
    }
}

module.exports = getPosts
