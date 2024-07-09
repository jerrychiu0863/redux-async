import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";
import type { User } from "../slices/userSlice";

export const addUser = createAsyncThunk<User, void, { rejectValue: string }>('users/add', async (_, { rejectWithValue }) => {
  const response = await axios.post('http://localhost:3005/users', {
    name: faker.name.fullName()
  });

  return response.data as User;
})
