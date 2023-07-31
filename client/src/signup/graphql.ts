import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation ($newUserData: NewUserInput!) {
        addUser(newUserData: $newUserData) {
            id
            firstName
            lastName
            email
        }
    }
`;
