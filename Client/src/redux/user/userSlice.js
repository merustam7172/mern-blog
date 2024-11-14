import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null,
    loading : false,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess : (state, action) => {
            state.currentUser = action.payload
            state.loading = false;
            state.error = null;
        },
        updateProfileFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        DeleteUserStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        DeleteUserSuccess : (state) => {
            state.currentUser = null
            state.loading = false;
            state.error = null;
        },
        DeleteUserFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  DeleteUserStart,
  DeleteUserSuccess,
  DeleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;