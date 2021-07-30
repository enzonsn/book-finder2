const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        bookId: String
        image: String
        link: String
        title: String
        authors: [String]
        description: String
    }
    type User {
        _id: ID!
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Query {
        me: User
    }
    input BookInput{
        bookId: String
        image: String
        link: String
        title: String
        authors: [String]
        description: String
    }
    type Auth { 
        token: ID!
        user: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;