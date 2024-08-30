import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn : false,   //Is the current user logged in or not
    userData : null  //currentUser's id, name, email, password, etc.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        login : (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        logout : (state, action) => {
            state.isLoggedIn = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;