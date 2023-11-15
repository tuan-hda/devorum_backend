const UserModel = require('../models/User')
const express = require('express')
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.Next} next
 * @returns
 */
const getProfile = async (req, res, next) => {
  try {
    const username = req.query.username

    if (!username) {
      return res.status(400).json({
        msg: 'Missing username',
      })
    }

    const user = await UserModel.findOne({
      username,
    })

    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = getProfile
