import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const objectListSlice = createSlice({
  name: "objectList",
  initialState: initialState,
  reducers: {
    createObjectList: (state, action) => {
      state.value.push(action.payload);
      //console.log(state.value);
    },
    removeObjectFromList: (state, action) => {
      state.value = state.value.filter((obj) => obj._id !== action.payload);
    },
  },
});

export const { createObjectList, removeObjectFromList } =
  objectListSlice.actions;
export default objectListSlice.reducer;
