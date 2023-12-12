const UserModel = require('../../models/User')
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.Next} next
 * @returns
 */
const listProfiles = async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports = listProfiles
