import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // Make sure the path is correct

export const store = configureStore({
  reducer: {
    user: userReducer, // Add your userReducer to the store
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
