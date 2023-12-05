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
    "dns:///users:50051",
    grpc.credentials.createInsecure()
  );

  server.getUser({ id: id }, function (err, response) {
    if (err) {
      console.log("Fail to get user: ", err);
    } else {
      return response;
    }
  });
}

module.exports = getUserById;
