import type { Album } from "../store/apis/albumsApi";
import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";

type AlbumListItemProps = {
  album: Album
}

function AlbumListItem({ album }: AlbumListItemProps) {
  const header = <>
    <Button className="mr-3">
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