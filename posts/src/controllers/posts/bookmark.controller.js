const PostModel = require('../../models/Post')
const client = require('../../services/recombee')
var recombee = require('recombee-api-client')
var rqs = recombee.requests

const bookmark = async (req, res, next) => {
    try {
        const user = req.user

        const isBookmarked = await PostModel.findOne({ bookmark: user.username })
        if (isBookmarked) {
            await PostModel.findByIdAndUpdate(req.params.id, { $pull: { bookmark: user.username } })
            client.send(new rqs.DeleteBookmark(user.username, req.params.id), (err, response) => {
                //...
            })
        } else {
            await PostModel.findByIdAndUpdate(req.params.id, { $push: { bookmark: user.username } })
            client.send(
                new rqs.AddBookmark(user.username, req.params.id, {
                    cascadeCreate: true,
                }),
                (err, response) => {
                    //...
                }
            )
        }

        res.status(200).json('Bookmarked')
    } catch (error) {
        next(error)
    }
}

module.exports = bookmark
