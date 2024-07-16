import type { User } from "../type";
import { albumsApi } from "../store/apis/albumsApi";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";

type AblumsListProps = {
  user: User;
}

function AlbumsList({ user }: AblumsListProps) {
  const { data, error, isLoading } = albumsApi.useFetchAlbumsQuery(user)
  const [addAlbum, results] = albumsApi.useAddAlbumMutation()
  console.log(results)

  const handleAlbumAdd = () => {
    addAlbum(user)
  }

  let content;
  if (isLoading) {
    content = <Skeleton times={3} className="h-10 w-full" />
  } else if (error) {
    content = <div>Error loading albums</div>
  } else {
    content = data?.map(album => {
      const header = <>
        <Button className="mr-3">
          <GoTrashcan />
        </Button>{album.title}
      </>

      return (
        <ExpandablePanel key={album.id} header={header}>
          Ablum
        </ExpandablePanel>
      )
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p>Albums for {user.name}</p>
        <Button primary onClick={handleAlbumAdd}>Add Album</Button>
        {error && 'Creating album error'}
      </div>
      <div>{content}</div>
    </div>
  )
}

export default AlbumsList