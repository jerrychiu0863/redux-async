import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

export type User = {
  id: number;
  name: string;
}

type UserState = {
  data: User[];
  isLoading: boolean;
  error: null | { message: string }
}

const initialState: UserState = { data: [], isLoading: false, error: null }

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    // When you create a thunk, athe thunk will have three properties automatically assigneed to it
    // fetchUsers.pending === 'users/fetch/pending'
    // fetchUsers.fulfilled === 'users/fetch/fulfilled'
    // fetchUsers.rejected === 'users/fetch/rejected'
    builder.addCase(fetchUsers.pending, (state) => {
      // Update state object however appropriate
      // to show the user what we are doing
      state.isLoading = true

    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = { message: action.error.message || 'error' }

      // state.error = action.error;
      console.log(action)
    })
  }
})

export const usersReducer = userSlice.reducer