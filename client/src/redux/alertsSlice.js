import {createSlice} from '@reduxjs/toolkit'
const alertSlice = createSlice({
    name:"alerts",
    initialState:{
        loading:false,
    },
    reducers:{
        showLoading:(state,action) => {
            state.loading = true
        },
        HideLoading:(state,action) => {
            state.loading = false
        },

    }
})

export const {showLoading,HideLoading} = alertSlice.actions;
export default alertSlice.reducer;