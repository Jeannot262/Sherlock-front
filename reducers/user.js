import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {
        username : null,
        password : null,
        objects : [],
    }
};

export const userSlice = createSlice({
    name : "user",
    initialState : initialState,
    reducers : {
        updateUser : (state, action) => {
            state.value.username = action.payload.username;
            state.value.password = action.payload.password;
        },
        updateObjectList : (state, action) => {
            state.value.objects.push(action.payload);
        }
    }
});

export const { updateUser, updateObjectList } = userSlice.actions;
export default userSlice.reducer;