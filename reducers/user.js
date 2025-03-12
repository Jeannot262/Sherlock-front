import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {
        _id : null,
        username : null,
        password : null,
        profileImage : null,
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
            state.value.profileImage = action.payload.profileImage;
            console.log(state.value);
        },
        resetUser : (state) => {
            state.value._id = null;
            state.value.username = null;
            state.value.password = null;
            state.value.profileImage = null;
            console.log(state.value);
        }
    }
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;