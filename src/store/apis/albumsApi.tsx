import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../type";
import { faker } from "@faker-js/faker";

type Album = {
  title: string;
  id: string;
  userId: string;
}

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),
  endpoints: (builder) => ({
    fetchAlbums: builder.query<Album[], User>({
      query(user) {
        return {
          url: '/albums',
          params: {
            userId: user.id
          },
          method: 'GET'
        }
      }
    }),
    addAlbum: builder.mutation<Album, User>({
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