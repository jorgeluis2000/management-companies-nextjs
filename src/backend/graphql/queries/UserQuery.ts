import { gql } from "@apollo/client"


export const GET_USER = gql`
query Query() {
  user {
    id
    image
    name
    email
    createdAt
    role
    updatedAt
    userConfig {
      id
      language {
        code
        name
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