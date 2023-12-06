const dbHandler = require('./db-handler')
const { mockNext, mockResponse, testExpressValidatorMiddleware } = require('./interceptor')
const registerUser = require('../controllers/users/registerUser.controller')
const { validateNewUser } = require('../validators/user.validator')

beforeAll(async () => await dbHandler.connect())
afterEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

describe('registerUser ', () => {
  it('can register correctly', async () => {
    // Define data

    const bodyData = {
      username: 'test',
      email: 'test@gmail.com',
      password: 'abcd1234',
    }
    const expectedResponse = {
      username: 'test',
      email: 'test@gmail.com',
    }

    // Mock req,res,next and mock validator
    const req = {
      body: bodyData,
    }
    const res = mockResponse()
    const next = mockNext()
    await testExpressValidatorMiddleware(req, res, validateNewUser())

    // Perform test
    await registerUser(req, res, next)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(expectedResponse))
  })

  it('fail if missing info', async () => {
    // Define data
    const bodyData = {
      username: 'test',
      password: 'abcd1234',
    }

    // Mock req,res,next and mock validator
    const req = {
      body: bodyData,
    }
    const res = mockResponse()
    const next = mockNext()
    await testExpressValidatorMiddleware(req, res, validateNewUser())

    // Perform test
    await registerUser(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('fail if duplicate email', async () => {
    // Define data
    const bodyData = {
      username: 'test',
      email: 'test@gmail.com',
      password: 'abcd1234',
    }
    const expectedResponse = expect.objectContaining({
      errors: expect.arrayContaining([
        expect.objectContaining({
          msg: expect.stringContaining('already exists'),
        }),
      ]),
    })

    // Mock req,res,next and mock validator
    const req = {
      body: bodyData,
    }
    const res = mockResponse()
    const next = mockNext()
    await testExpressValidatorMiddleware(req, res, validateNewUser())

    // Perform test
    await registerUser(req, res, next)
    await registerUser(req, res, next)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledTimes(2)
    expect(res.json).toHaveBeenCalledWith(expectedResponse)
  })

  it('unexpected fail', async () => {
    // Define data

    // Mock req,res,next and mock validator
    const req = {}
    const res = null
    const next = mockNext()

    // Perform test
    await registerUser(req, res, next)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
