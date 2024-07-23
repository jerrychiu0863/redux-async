import { photosApi } from "../store/apis/photosApi";
import type { Album } from "../store/apis/albumsApi";
import Button from "./Button";
import Skeleton from "./Skeleton";

type PhotoListProps = {
  album: Album;
}

function PhotoList({ album }: PhotoListProps) {
  const { data, error, isFetching } = photosApi.useFetchPhotosQuery(album);
  const [addPhoto, { isLoading: isAddPhotoLoading }] = photosApi.useAddPhotoMutation();
  console.log(data)

  const handlePhotoAdd = () => {
    addPhoto(album)
  }

  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />
  } else if (error) {
    content = 'Error fetching photos...'
  } else {
    content = <div className="flex">
      {data?.map(photo => {
        return <div key={photo.id}><img src={photo.url} /></div>
      })
      }
    </div>
  }


  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <p>Photos for {album.title}</p>
        <Button primary onClick={handlePhotoAdd}>Add Photo</Button>
        {error && 'Creating photo error'}
      </div>
      {content}
    </div>
  )
}

export default PhotoList