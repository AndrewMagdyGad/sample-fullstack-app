import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SigninState {
    email: string;
    password: string;
}

// Define the initial state using that type
const initialState: SigninState = { email: "", password: "" };

export const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<SigninState>) => {
            return action.payload;
        },
    },
});

export const { update } = signinSlice.actions;

export default signinSlice.reducer;
