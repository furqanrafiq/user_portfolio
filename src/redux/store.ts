import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../screens/Auth/redux/authSlice';
import serviceSlice from './serviceSlice';

export const store = configureStore({
    reducer: {
        user: authSlice,
        service: serviceSlice
    },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;