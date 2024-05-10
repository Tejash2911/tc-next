import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        error: null,
        id: null
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
            state.id = uuid();
        },
        clearError: (state) => {
            state.error = null;
            state.id = null;
        }
    }
})

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
