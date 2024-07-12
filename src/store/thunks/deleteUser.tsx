import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../type";

export const deleteUser = createAsyncThunk<User, User, { rejectValue: string }>('users/delete', async (user) => {
  const response = await axios.delete(`http://localhost:3005/users/${user.id}`)
  return response.data
})
