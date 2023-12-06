const { ObjectId } = require('mongodb')
const UserModel = require('../../models/User')
const express = require('express')
const getProfileService = require('../../services/getProfileService')
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.Next} next
 * @returns
 */
const getProfile = async (req, res, next) => {
  try {
    const username = req.params.username
    const authUser = req.user

    const user = await getProfileService({ username, authUser })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = getProfile
