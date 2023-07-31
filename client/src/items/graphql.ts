import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
    query {
        getAllItems {
            id
            title
            createdAt
            creator {
                firstName
                lastName
            }
        }
    }
`;

export const ADD_ITEM = gql`
    mutation ($createItem: NewItemInput!) {
        createItem(createItem: $createItem) {
            id
            title
            createdAt
            creator {
                firstName
                lastName
            }
        }
    }
`;
