import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
query Query($limit: Int!, $page: Int!, $user: ID, $typeTransaction: TypeTransaction) {
  transactions(limit: $limit, page: $page, user: $user, typeTransaction: $typeTransaction) {
    amount
    concept
    createdAt
    id
    typeTransaction
    user {
      id
      name
      role
    }
  }
}
`;

export const COUNT_TRANSACTIONS = gql`
query Query($user: ID, $typeTransaction: TypeTransaction) {
  countTransactions(user: $user, typeTransaction: $typeTransaction)
}
`;

export const CURRENT_BALANCE_TRANSACTION = gql`
query Query {
  currentBalance
}
`;
