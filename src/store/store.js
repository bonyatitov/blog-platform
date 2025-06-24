import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from './slices/articleSlice';
import allInfoReducer from './slices/allInfoSlice';
import paginationReducer from './slices/paginationSlice';
import registrationReducer from './slices/registrationSlice';
import authReducer from './slices/authSlice';
import editProfileReducer from './slices/editProfileSlice';
import likeReducer from './slices/likeSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    allInfo: allInfoReducer,
    pagination: paginationReducer,
    registration: registrationReducer,
    auth: authReducer,
    editProfile: editProfileReducer,
    like: likeReducer
  }
});