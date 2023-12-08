const createHttpError = require('http-errors')
const mongoose = require('mongoose')

const UserTitleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        communityId: {
            type: String,
            required: true,
        },
        description: String,
        backgroundColor: String,
        textColor: String,
    },
    {
        timestamps: true,
    }
)
UserTitleSchema.pre('save', async function (next) {
    const userTitle = this

    const exist = await mongoose.models['userTitle'].findOne({
        communityId: userTitle.communityId,
        name: userTitle.name,
    })
    if (exist) {
        throw createHttpError[400]('User title already exists')
    }

    next()
})

const UserTitleModel = mongoose.model('userTitle', UserTitleSchema)

module.exports = UserTitleModel
