const UserModel = require('../../models/User')

const updateProfile = async (req, res, next) => {
  const { fullName, avatar, banner, about, website, github, x, work, education, position } = req.body

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
          website,
          github,
          x,
          work,
          education,
          position,
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

module.exports = updateProfile