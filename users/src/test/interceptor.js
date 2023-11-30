module.exports = {
  mockRequest: () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    req.query = jest.fn().mockReturnValue(req)
    req.header = (name) => {
      return req[name]
    }
    return req
  },

  mockResponse: () => {
    const res = {}
    res.send = jest.fn(() => res)
    res.status = jest.fn(() => res)
    res.json = jest.fn(() => res)
    return res
  },

  mockNext: () => jest.fn(),

  async testExpressValidatorMiddleware(req, res, middlewares) {
    await Promise.all(
      middlewares.map(async (middleware) => {
        await middleware(req, res, () => undefined)
      })
    )
  },
}
