import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_MESSAGES_BY_USER = gql`
  query MessagesByUser($receiverId: Int!) {
    messagesByUser(receiverId: $receiverId) {
      id
      text
      receiverId
      senderId
      createdAt
    }
  }
`;

export const CHECK_TOKEN = gql`
  query CheckToken($token: String!) {
    checkToken(token: $token)
  }
`;
