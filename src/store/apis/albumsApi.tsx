import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../type";

type Album = {
  name: string;
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
    })
  })
})

// export const { useFetchAlbumsQuery } = albumsApi;
// export type UseFetchAlbumsQueryType = typeof useFetchAlbumsQuery;
export { albumsApi }

// Hooks
//albumsApi.useFetchAlbumsQuery()