const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createMessage(receiverId, text, userId) {
  const message = await prisma.message.create({
    data: {
      text,
      receiverId,
      senderId: userId,
    },
  });

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

module.exports = { createMessage, messagesByUser };
