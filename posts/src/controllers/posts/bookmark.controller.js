const PostModel = require('../../models/Post')

const bookmark = async (req, res, next) => {
    try {
        const user = req.user

        const isBookmarked = await PostModel.findOne({ bookmark: user.username })
        if (isBookmarked) {
            await PostModel.findByIdAndUpdate(req.params.id, { $pull: { bookmark: user.username } })
        } else {
            await PostModel.findByIdAndUpdate(req.params.id, { $push: { bookmark: user.username } })
        }

        res.status(200).json('Bookmarked')
    } catch (error) {
        next(error)
    }
}

module.exports = bookmark
