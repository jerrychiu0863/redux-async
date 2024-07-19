import type { Album } from "../store/apis/albumsApi";
import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import { albumsApi } from "../store/apis/albumsApi";

type AlbumListItemProps = {
  album: Album
}

function AlbumListItem({ album }: AlbumListItemProps) {
  const [removeAlbum, { isLoading }] = albumsApi.useRemoveAlbumMutation();
  // console.log(albumsApi.useRemoveAlbumMutation())

  const hadleAlbumRemove = () => {
    removeAlbum(album)
  }

  const header = <>
    <Button className="mr-3" onClick={hadleAlbumRemove} loading={isLoading}>
      <GoTrashcan />
    </Button>
    {album.title}
  </>

  return (
    <ExpandablePanel header={header}>
      Ablum
    </ExpandablePanel>
  )
}

export default AlbumListItem