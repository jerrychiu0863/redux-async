import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../type";
import { faker } from "@faker-js/faker";

export type Album = {
  title: string;
  id: string;
  userId: string;
}

// DEV ONLU
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}



const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // For Dev Only
      await pause(1000)
      return fetch(...args)
    }
  }),
  tagTypes: ['Album'],
  endpoints: (builder) => ({
    fetchAlbums: builder.query<Album[], User>({
      // result: This is the data returned from the server in response to the query. 
      // In this case, it will be an array of Album objects if the query is successful.

      // error: This represents any error that occurred during the query. 
      // If the query fails, this will contain error information.

      // user: This is the argument passed to the query when it is initiated. In this case, 
      // it is the User object which is used to specify the user for whom the albums are being fetched.
      providesTags: (result, error, user) => [{ type: 'Album', id: user?.id }],
      query(user) {
        return {
          url: '/albums',
          params: {
            userId: user.id
          },
          method: 'GET',
        }
      }
    }),
    addAlbum: builder.mutation<Album, User>({
      invalidatesTags: (result, error, user) => [{ type: 'Album', id: user?.id }],
      query(user) {
        return {
          url: '/albums',
          method: 'POST',
          body: {
            userId: user.id,
            title: faker.commerce.productName()
          }
        }
      }
    })
  })
})

// export const { useFetchAlbumsQuery } = albumsApi;
// export type UseFetchAlbumsQueryType = typeof useFetchAlbumsQuery;
export { albumsApi }

// Hooks
//albumsApi.useFetchAlbumsQuery()

// How to update the interface after mutation
// 1. Take data from the response and add it to the list of albums
// Pros: Only one request
// Cons: All codes become more complicated. Response might not contain the needed data

// 2. After the mutation, send a request to get all albums
// Pros: Easier to picture the data flow
// Cons: Two requests