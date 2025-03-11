import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : null
};

export const sharedWithUserSlice = createSlice({
    name : "sharedWithUser",
    initialState : initialState,
    reducers : {
        updateSharedWithUser : (state, action) => {
            state.value = action.payload;
            console.log(state.value);
        }
    }
});

export const { updateSharedWithUser } = sharedWithUserSlice.actions;
export default sharedWithUserSlice.reducer;