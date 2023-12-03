var PROTO_PATH = "./protos/messages/user_message.proto";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var usersProto = grpc.loadPackageDefinition(packageDefinition);

function getUserById(id) {
  var server = new usersProto.Users(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
  server.getUser({ id }, function (err, res) {
    if (err) {
      console.log("Fail to send request");
    } else {
      console.log("🚀 ~ file: gRPC.js:25 ~ res:", res);
      return res;
    }
  });
}

module.exports = getUserById;
