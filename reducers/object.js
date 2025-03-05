import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {
        name : null,
        picture : null,
        description : null,
        loanedTo : null,
        sharedWith : null,
        owwner : null,
    }
};

export const objectSlice = createSlice({
    name : "object",
    initialState : initialState,
    reducers : {
        updateObject : (state, action) => {
            state.value.name = action.payload.name;
            state.value.picture = action.payload.picture;
            state.value.description = action.payload.description;
            state.value.loanedTo = action.payload.loanedTo;
            state.value.sharedWith = action.payload.sharedWith;
            console.log(state.value);
        },
    }
});

export const { updateObject } = objectSlice.actions;
export default objectSlice.reducer;