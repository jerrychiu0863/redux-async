import { createSlice } from "@reduxjs/toolkit";

export type User = {
  name: string;
}

const initialState: { data: User[] } = { data: [] }

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  }
})

export const usersReducer = userSlice.reducer