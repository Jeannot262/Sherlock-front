import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
};

export const objectListSlice = createSlice({
    name : "objectList",
    initialState : initialState,
    reducers : {
        createObjectList : (state, action) => {
            state.value.push(action.payload);
            //console.log(state.value);
        },
    }
});

export const { createObjectList } = objectListSlice.actions;
export default objectListSlice.reducer;