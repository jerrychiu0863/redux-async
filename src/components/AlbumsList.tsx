import type { User } from "../type";
import { albumsApi } from "../store/apis/albumsApi";
import Button from "./Button";
import Skeleton from "./Skeleton";
import AlbumListItem from "./AlbumListItem";

type AblumsListProps = {
  user: User;
}

function AlbumsList({ user }: AblumsListProps) {
  const { data, error, isLoading, isFetching } = albumsApi.useFetchAlbumsQuery(user)
  const [addAlbum, { isLoading: isAddAlbumLoading }] = albumsApi.useAddAlbumMutation()
  console.log(albumsApi.useFetchAlbumsQuery(user))
  const handleAlbumAdd = () => {
    addAlbum(user)
  }

  let content;
  if (isFetching || isLoading) {
    content = <Skeleton times={3} className="h-10 w-full" />
  } else if (error) {
    content = <div>Error loading albums</div>
  } else {
    content = data?.map(album => {
      return (
        <AlbumListItem key={album.id} album={album} />
      )
    })
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <p>Albums for {user.name}</p>
        <Button primary onClick={handleAlbumAdd} loading={isAddAlbumLoading}>Add Album</Button>
        {error && 'Creating album error'}
      </div>
      <div>{content}</div>
    </div>
  )
}

export default AlbumsList