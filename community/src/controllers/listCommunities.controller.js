const CommunityModel = require('../models/Community')
const JoinedCommunityModel = require('../models/JoinedCommunity')

const listCommunities = async (req, res, next) => {
    const user = req.user
    try {
        let communities = await JoinedCommunityModel.find({
            username: user.username,
        })
        const communitiesData = await CommunityModel.find()
        communities = communities.map((community) => {
            const communityData = communitiesData.find(
                (communityData) =>
                    communityData._id.toString() ===
                    community.communityId.toString()
            )
            return communityData.name
        })
        return res.status(200).json(communities)
    } catch (error) {
        next(error)
    }
}

module.exports = listCommunities
