import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../screens/Auth/redux/authSlice';

export const store = configureStore({
    reducer: {
        user: authSlice
    },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;