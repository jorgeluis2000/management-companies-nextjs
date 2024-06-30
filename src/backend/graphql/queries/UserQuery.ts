import { gql } from "@apollo/client"


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
`

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
`