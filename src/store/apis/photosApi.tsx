import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Album } from "./albumsApi";
import { faker } from "@faker-js/faker";

export type Photo = {
  id: string;
  url: string;
  albumId: string;
}

// DEV ONLU
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // For Dev Only
      await pause(1000)
      return fetch(...args)
    }
  }),
  tagTypes: ['Photo', 'AlbumPhoto'],
  endpoints: (builder) => ({
    fetchPhotos: builder.query<Photo[], Album>({
      providesTags: (result, error, album) => {
        return result
          ? [...result.map((photo) => { return { type: 'Photo' as const, id: photo.id } }), { type: 'AlbumPhoto', id: album.id }]
          : [{ type: 'AlbumPhoto', id: album.id }]
      },
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
      invalidatesTags: (result, error, album) => [{ type: 'AlbumPhoto', id: album.id }],
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
      invalidatesTags: (result, error, photo) => [{ type: 'Photo', id: photo.id }],
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