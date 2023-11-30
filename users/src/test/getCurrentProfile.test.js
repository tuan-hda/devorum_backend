const dbHandler = require('./db-handler')
const { mockNext, mockResponse, mockRequest } = require('./interceptor')
const { initUser, loginUser } = require('./utils')
const getCurrentProfile = require('../controllers/users/getCurrentProfile.controller')
const { authenticateJWT } = require('../middlewares/auth.middleware')

beforeAll(async () => await dbHandler.connect())
afterEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

describe('getCurrentProfile ', () => {
  it('can get current profile correctly', async () => {
    await initUser()

    // Mock req,res,next and mock validator
    const req = mockRequest()
    const res = mockResponse()
    const next = mockNext()

    // Append token to req
    await loginUser(req)
    await authenticateJWT(req, res, next)

    // Perform test
    await getCurrentProfile(req, res, next)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('unexpected fail', async () => {
    // Define data

    // Mock req,res,next and mock validator
    const req = {}
    const res = null
    const next = mockNext()

    // Perform test
    await getCurrentProfile(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
