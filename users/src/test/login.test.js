const dbHandler = require('./db-handler')
const { mockNext, mockResponse, testExpressValidatorMiddleware } = require('./interceptor')
const { validateLogin } = require('../validators/user.validator')
const login = require('../controllers/users/login.controller')
const { initUser } = require('./utils')

beforeAll(async () => await dbHandler.connect())
afterEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

describe('loginUser ', () => {
  it('can login correctly', async () => {
    await initUser()

    // Define data
    const bodyData = {
      email: 'test@gmail.com',
      password: 'abcd1234',
    }

    // Mock req,res,next and mock validator
    const req = {
      body: bodyData,
    }
    const res = mockResponse()
    const next = mockNext()
    await testExpressValidatorMiddleware(req, res, validateLogin())

    // Perform test
    await login(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('fail if missing fields', async () => {
    await initUser()

    // Define data
    const bodyData = {
      password: 'abcd1234',
    }

    // Mock req,res,next and mock validator
    const req = {
      body: bodyData,
    }
    const res = mockResponse()
    const next = mockNext()
    await testExpressValidatorMiddleware(req, res, validateLogin())

    // Perform test
    await login(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('fail if not exists user', async () => {
    await initUser()

    // Define data
    const bodyData = {
      email: 'somerandom@gmail.com',
      password: 'abcd1234',
    }

    // Mock req,res,next and mock validator
    const req = {
      body: bodyData,
    }
    const res = mockResponse()
    const next = mockNext()
    await testExpressValidatorMiddleware(req, res, validateLogin())

    // Perform test
    await login(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('fail if not correct password', async () => {
    await initUser()

    // Define data
    const bodyData = {
      email: 'test@gmail.com',
      password: 'wrongpass',
    }

    // Mock req,res,next and mock validator
    const req = {
      body: bodyData,
    }
    const res = mockResponse()
    const next = mockNext()
    await testExpressValidatorMiddleware(req, res, validateLogin())

    // Perform test
    await login(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('unexpected fail', async () => {
    // Define data

    // Mock req,res,next and mock validator
    const req = {}
    const res = null
    const next = mockNext()

    // Perform test
    await login(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
