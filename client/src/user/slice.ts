import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface userState {
    user: null | { firstName: string; lastName: string };
}

const getInitialState = () => {
    const user = localStorage.getItem("user");

    if (user && JSON.parse(user).firstName && JSON.parse(user).lastName) {
        return JSON.parse(user);
    }

    return null;
};

// Define the initial state using that type
const initialState: userState = { user: getInitialState() };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState>) => {
            state.user = action.payload.user;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
