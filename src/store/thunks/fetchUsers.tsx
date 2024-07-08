import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../slices/userSlice";

// Create the thunk. Give it a base type that describes the purpose of the request
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>('users/fetch', async (_, { rejectWithValue }) => {

  const response = await axios.get('http://localhost:3005/');
  const data = response.data as User[]
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue('An unknow error!')
  }
  return data

})

