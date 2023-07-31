import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SignupState {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// Define the initial state using that type
const initialState: SignupState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
};

export const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<SignupState>) => {
            return action.payload;
        },
    },
});

export const { update } = signupSlice.actions;

export default signupSlice.reducer;
