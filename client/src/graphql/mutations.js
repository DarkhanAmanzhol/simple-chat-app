import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($user: RegisterInput!) {
    registerUser(user: $user) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($user: LoginInput!) {
    loginUser(user: $user) {
      token
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation CreateMessage($receiverId: Int!, $text: String!) {
    createMessage(receiverId: $receiverId, text: $text) {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription Subscription {
    messageAdded {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`;
