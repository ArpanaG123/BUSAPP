import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name:"users",
    initialState:{
        user:null
    },
    reducers:{
        setUsers : (state,action) => {
            state.user = action.payload

        }
    }
})

export const {setUsers} = usersSlice.actions;
export default usersSlice.reducer;