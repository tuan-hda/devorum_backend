const { ObjectId } = require('mongodb')
const MessageModel = require('../models/Message')

const listRoomsController = async (req, res, next) => {
    try {
        const id = req.params.id

        console.log('find messages of room with id', id)
        let messages = await MessageModel.find({
            room: new ObjectId(id),
        })
        console.log('found messages length', messages.length)

        return res.status(200).json(messages)
    } catch (error) {
        next(error)
    }
}

module.exports = listRoomsController
