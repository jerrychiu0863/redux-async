import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../slices/userSlice";

export type ResponseType = {
  data: User[];
  status: number
}

// Create the thunk. Give it a base type that describes the purpose of the request
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>('users/fetch', async (_, { rejectWithValue }) => {

  const { data, status } = await axios.get('http://localhost:3005/users') as ResponseType;

  // DEV ONLU
  await pause(1000)

  if (status < 200 || status >= 300) {
    return rejectWithValue('An unknow error!')
  }

  return data
})

// DEV ONLU
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

