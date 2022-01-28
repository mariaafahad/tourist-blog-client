import { configureStore } from '@reduxjs/toolkit';
import travelSlice from './slice';

const store = configureStore({
    reducer: {
        allBlogs: travelSlice
    }
})

export default store;