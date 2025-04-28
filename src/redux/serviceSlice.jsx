import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: [],
};

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        storeServices: (state, action) => {
            state.services = action.payload;
        },
    },
});

// Export actions
export const { storeServices } = serviceSlice.actions;

// Export reducer
export default serviceSlice.reducer;
