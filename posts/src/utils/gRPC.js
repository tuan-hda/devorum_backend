var PROTO_PATH = "/app/protos/users.proto";
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
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

function getUserById(id) {
  var server = new protoDescriptor.users.proto.Users(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
  console.log("🚀 ~ file: gRPC.js:20 ~ getUserById ~ server:", server);
  server.getUser({ id: id }, function (err, res) {
    if (err) {
      console.log("Fail to send request: ", err);
    } else {
      console.log("🚀 ~ file: gRPC.js:25 ~ res:", res);
      return res;
    }
  });
}

module.exports = getUserById;
