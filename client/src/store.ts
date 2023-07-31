import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signup/slice";
import signinReducer from "./signin/slice";
import itemsReducer from "./items/slice";
import userReducer from "./user/slice";

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        signin: signinReducer,
        items: itemsReducer,
        user: userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
