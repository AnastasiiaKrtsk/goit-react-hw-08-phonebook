import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './contactsSlice';
import authSlice from './authSlice'; // Import the authSlice

const rootReducer = {
  contacts: contactsSlice.reducer,
  auth: authSlice, // Add the authSlice.reducer to the rootReducer
};

export const store = configureStore({
  reducer: rootReducer,
});
