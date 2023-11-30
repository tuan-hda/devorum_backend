const login = require('../controllers/users/login.controller')
const registerUser = require('../controllers/users/registerUser.controller')
const { mockResponse } = require('./interceptor')

module.exports = {
  initUser: () =>
    registerUser(
      {
        body: {
          username: 'test',
          email: 'test@gmail.com',
          password: 'abcd1234',
        },
      },
      () => {},
      () => {}
    ),
  initTargetUser: () =>
    registerUser(
      {
        body: {
          username: 'target',
          email: 'target@gmail.com',
          password: 'abcd1234',
        },
      },
      () => {},
      () => {}
    ),
  async loginUser(req) {
    const res = mockResponse()
    res.json = ({ token }) => {
      req.Authorization = 'Bearer ' + token
    }
    await login(
      {
        body: {
          email: 'test@gmail.com',
          password: 'abcd1234',
        },
      },
      res,
      () => {}
    )
  },
}
