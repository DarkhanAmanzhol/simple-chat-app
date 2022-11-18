const usersModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
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
    checkToken: (_, args) => {
      try {
        jwt.verify(args.token, process.env.JWT_SECRET);
        return true;
      } catch (err) {
        return false;
      }
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
