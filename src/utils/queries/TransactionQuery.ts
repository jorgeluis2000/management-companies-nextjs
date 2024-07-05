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
      email
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

export const GET_CHART_DATA_TRANSACTION = gql`
query Query($limit: Int!, $page: Int!, $typeTransaction: TypeTransaction!, $createdAfter: Date, $createdBefore: Date) {
  getChartData(limit: $limit, page: $page, typeTransaction: $typeTransaction, createdAfter: $createdAfter, createdBefore: $createdBefore) {
    amount
    createdAt
    user {
      email
      id
      name
      role
    }
  }
}
`;

export const ADD_TRANSACTION = gql`
mutation Mutation($concept: String!, $amount: Float!, $typeTransaction: TypeTransaction!) {
  addTransaction(concept: $concept, amount: $amount, typeTransaction: $typeTransaction) {
    amount
    concept
    createdAt
    id
    typeTransaction
    user {
      name
      id
      role
    }
  }
}
`;
