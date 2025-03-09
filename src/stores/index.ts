import { configureStore } from "@reduxjs/toolkit"
import tagListReducer from './tags'

export const store = configureStore({
    reducer:{
        tagList : tagListReducer
    }
})