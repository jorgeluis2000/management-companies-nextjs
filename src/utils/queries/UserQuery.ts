import { gql } from "@apollo/client";

export const GET_USER = gql`
query Query {
  user {
    createdAt
    email
    id
    image
    name
    phone
    updatedAt
    userConfig {
      id
      language {
        name
        code
      }
      theme
      timeZone {
        zone
        utcOffset
      }
    }
    role
  }
}
`;

export const COUNT_USER = gql`
query Query {
  countUsers
}
`;

export const GET_USER_BY_EMAIL = gql`
query Query($email: String!) {
  userByEmail(email: $email) {
    createdAt
    email
    id
    image
    name
    role
    updatedAt
    userConfig {
      id
      language {
        name
        code
      }
      theme
      timeZone {
        utcOffset
        zone
      }
    }
  }
}
`;

export const LIST_USERS = gql`
query Query($limit: Int!, $page: Int!) {
  users(limit: $limit, page: $page) {
    id
    name
    email
    role
    phone
    userConfig {
      id
      language {
        name
        code
      }
      theme
      timeZone {
        utcOffset
        zone
      }
    }
    updatedAt
    image
    createdAt
  }
}
`;

export const ADD_USER = gql`
mutation Mutation($email: String!, $name: String!, $password: String!, $role: Role!, $language: String!, $timeZone: String!, $theme: UserTheme!, $phone: String, $image: String) {
  addUser(email: $email, name: $name, password: $password, role: $role, language: $language, timeZone: $timeZone, theme: $theme, phone: $phone, image: $image) {
    id
    email
    image
    name
    phone
    role
    updatedAt
    createdAt
    userConfig {
      id
      theme
      language {
        code
        name
      }
      timeZone {
        utcOffset
        zone
      }
    }
  }
}
`;
