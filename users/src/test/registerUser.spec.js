const { mockRequest, mockResponse, mockNext } = require('./interceptor')
const controller = require('../controllers/users/registerUser.controller')

describe("Check method 'registerUserController' ", () => {
  test('should 201 and return correct value', async () => {
    const req = mockRequest()
    req.body = {
      username: 'tuan-hda',
      email: 'anhtuan.hoangdinh@gmail.com',
      password: 'abcd1234',
    }
    const res = mockResponse()
    const next = mockNext()

    await controller(req, res)

    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(201)
  })

  // test('should 404 and return correct value', async () => {
  //   let req = mockRequest()
  //   req.params.id = null
  //   const res = mockResponse()

  //   await controller.todoController(req, res)

  //   expect(res.status).toHaveBeenCalledWith(404)
  //   expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' })
  // })
})
