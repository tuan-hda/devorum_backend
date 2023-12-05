const UserModel = require("../../models/User");
const getUserInfo = async (id) => {
  try {
    const user = await UserModel.findById(id);

    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUserInfo;
