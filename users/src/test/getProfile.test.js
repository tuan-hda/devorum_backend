const dbHandler = require('./db-handler')
const { mockNext, mockResponse, mockRequest } = require('./interceptor')
const { initUser, loginUser, initTargetUser } = require('./utils')
const { authenticateJWT } = require('../middlewares/auth.middleware')
const getProfile = require('../controllers/users/getProfile.controller')

beforeAll(async () => await dbHandler.connect())
beforeEach(async () => {
  await initUser()
  await initTargetUser()
})
afterEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

describe('getProfile ', () => {
  it('can get profile correctly', async () => {
    // Define data
    const reqData = {
      params: {
        username: 'target',
      },
    }

    // Mock req,res,next and mock validator
    const req = mockRequest()
    req.params = reqData.params ? reqData.params : req.params
    req.body = reqData.body ? reqData.body : req.body
    const res = mockResponse()
    const next = mockNext()

    // Append token to req
    await loginUser(req)
    await authenticateJWT(req, res, next)

    // Perform test
    await getProfile(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('fail missing username', async () => {
    // Define data
    const reqData = {
      params: {},
    }

    // Mock req,res,next and mock validator
    const req = mockRequest()
    req.params = reqData.params ? reqData.params : req.params
    req.body = reqData.body ? reqData.body : req.body
    const res = mockResponse()
    const next = mockNext()

    // Append token to req
    await loginUser(req)
    await authenticateJWT(req, res, next)

    // Perform test
    await getProfile(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('fail user not found', async () => {
    // Define data
    const reqData = {
      params: {
        username: 'notexists',
      },
    }

    // Mock req,res,next and mock validator
    const req = mockRequest()
    req.params = reqData.params ? reqData.params : req.params
    req.body = reqData.body ? reqData.body : req.body
    const res = mockResponse()
    const next = mockNext()

    // Append token to req
    await loginUser(req)
    await authenticateJWT(req, res, next)

    // Perform test
    await getProfile(req, res, next)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('unexpected fail', async () => {
    // Define data

    // Mock req,res,next and mock validator
    const req = {}
    const res = null
    const next = mockNext()

    // Perform test
    await getProfile(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
