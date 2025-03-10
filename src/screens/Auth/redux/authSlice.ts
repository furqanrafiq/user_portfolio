import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: Object;
}

const initialState: AuthState = {
    user: {},
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        storeUserReducer: (state, action: PayloadAction<Object>) => {
            console.log(state)
            state.user = action.payload;
        },
    },
});

// Export actions
export const { storeUserReducer } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
