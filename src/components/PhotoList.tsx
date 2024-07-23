import { photosApi } from "../store/apis/photosApi";
import type { Album } from "../store/apis/albumsApi";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotoListItem from "./PhotoListItem";

type PhotoListProps = {
  album: Album;
}

function PhotoList({ album }: PhotoListProps) {
  const { data, error, isFetching } = photosApi.useFetchPhotosQuery(album);
  const [addPhoto, { isLoading: isAddPhotoLoading }] = photosApi.useAddPhotoMutation();

  const handlePhotoAdd = () => {
    addPhoto(album)
  }

  let content;
  if (isFetching) {
    content = <div className="flex"><Skeleton times={3} className="h-20 w-20 mr-3" /></div>
  } else if (error) {
    content = 'Error fetching photos...'
  } else {
    content = <div className="flex">
      {data?.map(photo => {
        return <PhotoListItem key={photo.id} photo={photo} />
      })
      }
    </div>
  }


  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <p>Photos for {album.title}</p>
        <Button primary onClick={handlePhotoAdd} loading={isAddPhotoLoading}>Add Photo</Button>
        {error && 'Creating photo error'}
      </div>
      {content}
    </div>
  )
}

export default PhotoList