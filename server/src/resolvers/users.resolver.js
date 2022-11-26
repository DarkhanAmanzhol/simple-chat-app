const usersModel = require("../models/users.model");
module.exports = {
  Query: {
    users: (_, args, context) => {
      console.log("context: ", context);
      if (!context.userId) throw new Error("You must be logged in");

      return usersModel.getAllUsers(context.userId);
    },
    user: (_, args) => {
      return usersModel.getUser(parseInt(args.id));
    },
  },
  Mutation: {
    registerUser: (_, args) => {
      return usersModel.registerUser(args.user);
    },
    loginUser: (_, args) => {
      return usersModel.loginUser(args.user);
    },
  },
};
