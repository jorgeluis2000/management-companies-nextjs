export const typeDefs = `#graphql
    scalar Date

    type User {
        id: ID!
        email: String
        name: String
        phone: String
        image:String
        userConfig: UserConfig
        role: Role
        createdAt: Date
        updatedAt: Date
    }

    type UserConfig {
        id: ID!
        language: Language
        timeZone: TimeZone
        theme: UserTheme
    }

    type Language {
        code: ID!
        name: String
    }

    type TimeZone {
        zone: ID!
        utcOffset: String
    }

    enum UserTheme {
        DARK
        LIGHT
        AUTO
    }
    enum Role {
        ADMIN
        USER
    }

    enum TypeTransaction {
      INCOME
      EXPENSE
    }


    type Transaction {
        id: ID
        concept: String
        amount: Float
        typeTransaction: TypeTransaction
        user: UserTransaction
        createdAt: Date
        updatedAt: Date
    }

    type UserTransaction {
        id: ID!
        email: String
        name: String
        role: Role
    }

    type Query {
        users(limit: Int!, page: Int!): [User]
        countUsers: Int
        user: User
        userByEmail(email: String!): User
        transactions(limit: Int!, page: Int!, typeTransaction: TypeTransaction, user: ID): [Transaction]
        countTransactions(typeTransaction: TypeTransaction, user: ID): Int
        currentBalance(user: ID): Float
    }

    type Mutation {
        addUser(email: String!, name: String!, password: String!, image: String, role: Role!, language: String!, timeZone: String!, theme: UserTheme!): User
        deleteUser(id: ID!): Boolean!
        updateUser(id: ID!, email: String, name: String, password: String, phone: String, image: String, role: Role, language: String, timeZone: String, theme: UserTheme!): User
        addTransaction(concept: String!, amount: Float!, typeTransaction: TypeTransaction!): Transaction
    }
`;
