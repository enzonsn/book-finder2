import gql from 'graphql-tag';

export const GET_ME = gql`
    query {
        me {
            _id
            username
            bookCount
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
