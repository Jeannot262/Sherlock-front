import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: null,
    picture: null,
    description: null,
    loanedTo: null,
    sharedWith: null,
    owner: null,
  },
};

export const objectSlice = createSlice({
  name: "object",
  initialState: initialState,
  reducers: {
    updateObject: (state, action) => {
      state.value.name = action.payload.name;
      state.value.picture = action.payload.picture;
      state.value.description = action.payload.description;
      state.value.loanedTo = action.payload.loanedTo;
      state.value.sharedWith = action.payload.sharedWith;
      state.value.owner = action.payload.owner;
      console.log(state.value);
    },
    addPhoto: (state, action) => {
      console.log(action.payload)
      state.value.picture = action.payload;
    },
    removePhoto: (state, action) => {
      state.value.picture = "";
    },
  },
});

export const { updateObject, addPhoto, removePhoto } = objectSlice.actions;
export default objectSlice.reducer;
