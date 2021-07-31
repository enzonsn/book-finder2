import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        login(username: $username, email: $emali, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($BookData: BookInput!){
        saveBook (BookData: $BookData){
            _id
            username
            email
            savedBooks {
                bookId
                image
                link
                title
                authors
                description
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!){
        removeBook(bookId: $bookId){
            _id
            username
            email
            savedBooks {
                bookId
                image
                link
                title
                authors
                description
            }
        }
    }
`;
