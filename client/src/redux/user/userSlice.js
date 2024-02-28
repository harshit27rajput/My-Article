import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.error = null
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.error = null
            state.loading = true
        }
    }

})

export const {signInFailure,signInStart,signInSuccess}= userSlice.actions
export default  userSlice.reducer;