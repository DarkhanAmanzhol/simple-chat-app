const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function getAllUsers(userId) {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      id: {
        not: userId,
      },
    },
  });

  return users;
}

async function getUser(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

async function userExistsInDB(userEmail) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

async function registerUser(user) {
  const dbUser = await userExistsInDB(user.email);
  if (dbUser) throw new Error("User already exists with that email");

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET);

  return { token };
}

async function loginUser(user) {
  const dbUser = await userExistsInDB(user.email);
  if (!dbUser) throw new Error("User does not exists with that email");

  const doMatch = await bcrypt.compare(user.password, dbUser.password);
  if (!doMatch) throw new Error("Email or Password is invalid");

  const token = jwt.sign({ userId: dbUser.id }, process.env.JWT_SECRET);

  return { token };
}

module.exports = { registerUser, getAllUsers, getUser, loginUser };
