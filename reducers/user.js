import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {
        _id : null,
        username : null,
        password : null,
    }
};

export const userSlice = createSlice({
    name : "user",
    initialState : initialState,
    reducers : {
        updateUser : (state, action) => {
            state.value._id = action.payload._id;
            state.value.username = action.payload.username;
            state.value.password = action.payload.password;
            console.log(state.value._id);
        },
    }
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;