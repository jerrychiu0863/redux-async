import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Album } from "./albumsApi";
import { faker } from "@faker-js/faker";

type Photo = {
  id: string;
  url: string;
  albumId: string;
}

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005'
  }),
  endpoints: (builder) => ({
    fetchPhotos: builder.query<Photo[], Album>({
      query(album) {
        return {
          url: '/photos',
          method: 'GET',
          params: {
            albumId: album.id
          }
        }
      }
    }),
    addPhoto: builder.mutation<void, Album>({
      query(album) {
        return {
          url: '/photos',
          method: 'POST',
          body: {
            albumId: album.id,
            url: faker.image.abstract(150, 150, true)
          }
        }
      }
    }),
    removePhoto: builder.mutation<void, Photo>({
      query(photo) {
        return {
          url: `/photos/${photo.id}`,
          method: 'DELETE',
        }
      }
    })
  })
})

export { photosApi }