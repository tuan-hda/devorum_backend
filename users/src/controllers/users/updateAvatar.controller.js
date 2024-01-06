const UserModel = require('../../models/User')
const client = require('../../services/recombee')
const recombee = require('recombee-api-client')
const rqs = recombee.requests

const updateAvatar = async (req, res, next) => {
    const { fullName, avatar, banner, about } = req.body

    try {
        const user = req.user

        const foundUser = await UserModel.findOneAndUpdate(
            {
                _id: user._id,
            },
            {
                $set: {
                    fullName,
                    avatar,
                    banner,
                    about,
                },
            }
        )

        res.status(200).json({
            msg: 'Updated successfully',
        })
        client
            .send(
                new rqs.SetUserValues(
                    foundUser.username,
                    {
                        fullName: foundUser.fullName,
                        avatar: foundUser.avatar,
                        banner: foundUser.banner,
                        about: foundUser.about,
                    },
                    {
                        cascadeCreate: true,
                    }
                )
            )
            .then((response) => {})
            .catch((error) => {
                //handle error
            })
    } catch (error) {
        next(error)
    }
}

module.exports = updateAvatar
