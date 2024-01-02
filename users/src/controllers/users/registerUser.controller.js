const { validationResult } = require('express-validator')
const UserModel = require('../../models/User')
const client = require('../../services/recombee')
const recombee = require('recombee-api-client')
const rqs = recombee.requests

const registerUser = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    try {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }

        // delete data.points

        const newUser = new UserModel(data)
        const result = await newUser.save()

        res.status(201).json(result)
        client
            .send(
                new rqs.SetUserValues(
                    result.username,
                    {
                        email: result.email,
                        username: result.username,
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
        if ('code' in error && error.code === 11000) {
            return res.status(400).json({
                errors: [
                    {
                        type: 'field',
                        msg: `${Object.keys(error.keyPattern).at(
                            0
                        )} already exists`,
                        path: Object.keys(error.keyPattern).at(0),
                        location: 'body',
                    },
                ],
            })
        }
        next(error)
    }
}

module.exports = registerUser
