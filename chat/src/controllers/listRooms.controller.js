const { getUserProducer } = require('../broker/userProducer')
const RoomModel = require('../models/Room')

const listRoomsController = async (req, res, next) => {
    try {
        const user = req.user

        let rooms = await RoomModel.find({
            participants: { $in: [user.username] },
        })
            .populate('lastMessage')
            .sort({ updatedAt: -1 })

        console.log('RPC participants info')
        const participantsInfo = await getUserProducer({
            username: rooms.map((room) => room.participants).flat(),
        })
        console.log('RPC succeeded, result:', participantsInfo)
        let finalResult = []
        for (let idx in rooms) {
            let infos = participantsInfo.filter((participant) =>
                rooms[idx].participants.includes(participant.username)
            )
            if (infos[0]?.username !== rooms[idx].participants[0])
                infos = infos.reverse()

            finalResult.push({
                ...rooms[idx].toObject(),
                participantsInfo: infos,
            })
        }
        console.log('Added participants info to rooms')

        return res.status(200).json(finalResult)
    } catch (error) {
        next(error)
    }
}

module.exports = listRoomsController
