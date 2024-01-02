const { ApiClient } = require('recombee-api-client')

const configs = require('../configs/config')
const client = new ApiClient(
    configs.RECOMBEE_DATABASE_ID,
    configs.RECOMBEE_DATABASE_PRIVATE_TOKEN,
    { region: 'ap-se' }
)

module.exports = client
