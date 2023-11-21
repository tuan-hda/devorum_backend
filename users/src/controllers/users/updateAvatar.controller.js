const UserModel = require('../../models/User')

const updateAvatar = async (req, res, next) => {
  const { fullName, avatar, banner, about } = req.body

  try {
    const user = req.user

    await UserModel.updateOne(
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
  } catch (error) {
    next(error)
  }
}

module.exports = updateAvatar
