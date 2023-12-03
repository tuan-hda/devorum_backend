var PROTO_PATH = "./protos/messages/user_message.proto";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const getUserInfo = require("../controllers/users/getUserInfo.controller");

// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var usersProto = grpc.loadPackageDefinition(packageDefinition);

function getUser(call, callback) {
  const requestId = call.request.id;
  const userInfo = getUserInfo(requestId);
  callback(null, userInfo);
}

function startServer() {
  var server = new grpc.Server();
  server.addService(usersProto.Users.service, { getUser: getUser });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

module.exports = startServer;
