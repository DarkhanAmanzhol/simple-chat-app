const messagesModel = require("../models/messages.model");

module.exports = {
  Query: {
    messagesByUser: (_, args, context) => {
      if (!context.userId) throw new Error("You must be logged in");

      return messagesModel.messagesByUser(args.receiverId, context.userId);
    },
  },
  Mutation: {
    createMessage: (_, args, context) => {
      if (!context.userId) throw new Error("You must be logged in");

      return messagesModel.createMessage(
        args.receiverId,
        args.text,
        context.userId
      );
    },
  },
};
