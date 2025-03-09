import { createSlice } from "@reduxjs/toolkit";

const tagListSlice = createSlice({
  name: "tagList",
  initialState: {
    tags: [
      {
        path: "/home",
        label: "首页",
      },
    ],
    flagCurrent: "/home",
  },
  reducers: {
    initializeTags(state, action) {
      state.tags = action.payload;
    },
    addTag(state, action) {
      const existingIndex = state.tags.findIndex((tag) => {
        return tag.path === action.payload.path;
      });
      if (existingIndex !== -1) {
        state.tags.splice(existingIndex, 1);
      }

      state.tags.push(action.payload);
    },
    removeTags(state, action) {
      const res = state.tags.findIndex(
        (item) => item.path === action.payload.path
      );
      state.tags.splice(res, 1);
    },
    setCurrentFlag(state, action) {
      state.flagCurrent = action.payload;
    },
  },
});

export const { initializeTags, addTag, removeTags, setCurrentFlag } =
  tagListSlice.actions;
export default tagListSlice.reducer;
