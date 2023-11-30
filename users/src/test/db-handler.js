const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongo = null

module.exports.connect = async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()

  await mongoose.connect(uri)
}

module.exports.closeDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongo.stop()
  }
}

module.exports.clearDatabase = async () => {
  if (mongo) {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
      await collection.deleteMany()
    }
  }
}
