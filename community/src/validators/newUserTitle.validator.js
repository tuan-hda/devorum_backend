const createHttpError = require('http-errors')
const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().required(),
    backgroundColor: Joi.string().required(),
    textColor: Joi.string().required(),
    description: Joi.string().allow(null, ''),
})

const newUserTitleValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        next(createHttpError[400](err.details))
    }
}

module.exports = newUserTitleValidator
