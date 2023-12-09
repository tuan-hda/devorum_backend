const createHttpError = require('http-errors')
const CommunityModel = require('../models/Community')
const JoinedCommunityModel = require('../models/JoinedCommunity')
const { getUserProducer } = require('../broker/userProducer')

const getCommunityMembersController = async (req, res, next) => {
    try {
        const name = req.params.name
        const user = req.user

        const community = await CommunityModel.findOne({ name })
        if (!community) {
            throw createHttpError[404]('Community not found')
        }

        if (community.visibility === 'private') {
            if (!user) {
                throw createHttpError[401]('Unauthorized')
            }
            const isMember = await JoinedCommunityModel.findOne({
                communityId: community._id,
                username: user.username,
            })
            if (!isMember) {
                throw createHttpError[403]('Forbidden')
            }
        }

        let members = await JoinedCommunityModel.find({
            communityId: community._id,
        })
        const usernames = members.map((member) => member.username)
        const membersData = await getUserProducer({ username: usernames })
        if (Array.isArray(membersData) && membersData.length > 0) {
            const membersDataMap = membersData.reduce((acc, cur) => {
                acc[cur.username] = cur
                return acc
            }, {})
            const newMembers = []
            members.forEach((member) => {
                const memberData = membersDataMap[member.username]
                if (memberData) {
                    newMembers.push({
                        ...member.toObject(),
                        user: memberData,
                    })
                }
            })
            members = newMembers
        }

        return res.status(200).json(members)
    } catch (error) {
        next(error)
    }
}

module.exports = getCommunityMembersController
