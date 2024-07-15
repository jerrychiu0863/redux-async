import type { User } from "../type";
import { albumsApi } from "../store/apis/albumsApi";

type AblumsListProps = {
  user: User;
}

function AlbumsList({ user }: AblumsListProps) {
  const { data, error, isLoading } = albumsApi.useFetchAlbumsQuery(user)
  console.log(data, error, isLoading)
  return (
    <div>{user.name}</div>
  )
}

export default AlbumsList