const { PrismaClient } = require("@prisma/client");
const { PubSub } = require("graphql-subscriptions");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const MESSAGE_ADDED = "MESSAGE_ADDED";

async function createMessage(receiverId, text, userId) {
  const message = await prisma.message.create({
    data: {
      text,
      receiverId,
      senderId: userId,
    },
  });

  pubsub.publish(MESSAGE_ADDED, { messageAdded: message });

  return message;
}

async function messagesByUser(receiverId, userId) {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      OR: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    },
  });

  return messages;
}

async function subscriptionMessages() {
  return pubsub.asyncIterator(MESSAGE_ADDED);
}

module.exports = { createMessage, messagesByUser, subscriptionMessages };
