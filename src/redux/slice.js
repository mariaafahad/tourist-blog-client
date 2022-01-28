import { createSlice } from "@reduxjs/toolkit";

const travelSlice = createSlice({
  name: "travelSlice",
  initialState: {
    allBlogs: [],
    blogs: [],
    isAdmin: false,
    myBlog: []
  },
  reducers: {
    setAllBlogs: (state, { payload }) => {
      state.allBlogs = [...payload];
    },
    setBlogs: (state, {payload}) => {
      state.blogs = [...payload];
    },
    setIsAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },
    setMyBlog: (state, { payload }) => {
      state.myBlog = [...payload];
    }
  },
});

export const {setAllBlogs, setBlogs, setIsAdmin, setMyBlog } = travelSlice.actions;

export default travelSlice.reducer;