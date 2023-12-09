// const config = require("../configs/config");
// const { v4: uuidv4 } = require("uuid");
// const { getChannel } = require("./rabbitMq");

// const targetQueueName = "rpc_users_queue";

// const getUserProducer = async ({ _id }) => {
//   const channel = await getChannel();
//   await channel.assertQueue(config.REPLY_TO_QUEUE_NAME, {
//     exclusive: true,
//   });

//   const payload = {
//     action: "getUser",
//     data: {
//       user_id,
//       username,
//       email,
//       fullName,
//       avatar,
//       banner,
//       about,
//       role,
//       points,
//       website,
//       github,
//       x,
//       work,
//       education,
//       position,
//     },
//   };

//   if (!channel) {
//     console.log("Cannot create channel");
//     return;
//   }
//   const id = uuidv4();

//   channel.sendToQueue(targetQueueName, Buffer.from(JSON.stringify(payload)), {
//     replyTo: config.REPLY_TO_QUEUE_NAME,
//     correlationId: id,
//   });

//   return new Promise((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       channel.close();
//       resolve("API could not fullfil the request!");
//     }, 8000);

//     channel.consume(
//       config.REPLY_TO_QUEUE_NAME,
//       (msg) => {
//         clearTimeout(timeout);
//         if (msg.properties.correlationId === id) {
//           console.log(msg.content.toString());
//           const response = JSON.parse(msg.content.toString());
//           if (response.error) {
//             reject(response.error);
//           } else {
//             resolve(response.data);
//           }
//         } else {
//           reject(new Error("Data not found"));
//         }
//         channel.close();
//       },
//       { noAck: true }
//     );
//   });
// };

// module.exports = { getUserProducer };
const config = require("../configs/config");
const { v4: uuidv4 } = require("uuid");
const { getChannel } = require("./rabbitMq");

const targetQueueName = "rpc_users_queue";

const getUserProducer = async ({ username, authUser }) => {
  const channel = await getChannel();
  await channel.assertQueue(config.REPLY_TO_QUEUE_NAME, {
    exclusive: true,
  });

  const payload = {
    action: "getUser",
    data: {
      username,
      authUser,
    },
  };

  if (!channel) {
    console.log("Cannot create channel");
    return;
  }
  const id = uuidv4();

  channel.sendToQueue(targetQueueName, Buffer.from(JSON.stringify(payload)), {
    replyTo: config.REPLY_TO_QUEUE_NAME,
    correlationId: id,
  });

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      channel.close();
      resolve("API could not fullfil the request!");
    }, 8000);

    channel.consume(
      config.REPLY_TO_QUEUE_NAME,
      (msg) => {
        clearTimeout(timeout);
        if (msg.properties.correlationId === id) {
          console.log(msg.content.toString());
          const response = JSON.parse(msg.content.toString());
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.data);
          }
        } else {
          reject(new Error("Data not found"));
        }
        channel.close();
      },
      { noAck: true }
    );
  });
};

module.exports = { getUserProducer };
