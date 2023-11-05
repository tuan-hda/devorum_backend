const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: String,
    avatar: String,
    banner: String,
    about: String,
    role: {
      type: String,
      default: 'member',
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

UserSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel
