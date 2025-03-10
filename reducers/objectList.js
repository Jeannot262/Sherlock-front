import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    list: null,
    object: null,
  },
};

export const objectListSlice = createSlice({
  name: "objectList",
  initialState: initialState,
  reducers: {
    createObjectList: (state, action) => {
      state.value.list = action.payload;
      console.log(state.value.list);
    },
    updateObjectList: (state, action) => {
      state.value.object = action.payload;
      console.log(state.value.object);
    },
    addObject: (state, action) => {
      state.value.object = action.payload;
      state.value.list.push(action.payload);
      console.log(state.value.object);
    },
    addPhoto: (state, action) => {
      state.value.object.picture = action.payload;
      console.log(state.value.object.picture);
    },
    removePhoto: (state) => {
      state.value.object.picture = null;
    },
    removeObjectFromList: (state, action) => {
      state.value.list = state.value.list.filter(
        (obj) => obj._id !== action.payload
      );
    },
  },
});

export const {
  createObjectList,
  updateObjectList,
  addObject,
  addPhoto,
  removePhoto,
  removeObjectFromList,
} = objectListSlice.actions;
export default objectListSlice.reducer;
