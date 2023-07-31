import { gql } from "@apollo/client";

export const SIGN_IN = gql`
    query ($user: LoginUserInput!) {
        login(user: $user) {
            user {
                firstName
                lastName
            }
            token
        }
    }
`;
