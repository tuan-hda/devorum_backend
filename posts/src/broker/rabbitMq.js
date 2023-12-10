const amqplib = require("amqplib");
const config = require("../configs/config");

let connection = null;

const connectRabbitMQ = async () => {
  try {
    connection = await amqplib.connect(config.MSG_QUEUE_URL);
    console.log("Created rabbitMQ connection successfully");
  } catch (error) {
    console.log("Create RabbitMQ connection failed:", error);
  }
};

/**
 *
 * @returns {amqplib.Channel}
 */
const getChannel = async () => {
  if (connection === null) {
    await connectRabbitMQ();
  }
  return await connection.createChannel();
};

module.exports = {
  getChannel,
};
