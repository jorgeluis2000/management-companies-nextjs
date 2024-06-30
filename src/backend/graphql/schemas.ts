

export const typeDefs = `#graphql
    scalar Date

    type User {
        id: ID!
        email: String
        name: String
        phone: String
        image:String
        userConfig: UserConfig
        transactions: []
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
        id: ID!
        concept: String
        amount: Float
        typeTransaction: TypeTransaction
        idUser: String
        user: User
        createdAt: Date
        updatedAt: Date
    }

    type Query {
        users(limit: Int!, page: Int!): [User]
        user: User
        userByEmail(email: String!): User
    }

    type Mutation {
        addUser(email: String!, name: String!, password: String!, image: String, role: Role!, language: String!, timeZone: String!, theme: UserTheme!): User
        deleteUser(id: ID!): Boolean!
        updateUser(id: ID!, email: String, name: String, password: String, image: String, role: Role, language: String, timeZone: String, theme: UserTheme!): User
    }
`