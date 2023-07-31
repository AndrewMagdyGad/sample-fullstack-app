import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Item {
    id: string;
    title: string;
    createdAt: string;
    creator: { firstName: string; lastName: string };
}
// Define a type for the slice state
interface ItemsState {
    items: Item[];
}

// Define the initial state using that type
const initialState: ItemsState = { items: [] };

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<ItemsState>) => {
            state.items = action.payload.items;
        },
        appendItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload);
        },
    },
});

export const { setItems, appendItem } = itemsSlice.actions;

export default itemsSlice.reducer;
