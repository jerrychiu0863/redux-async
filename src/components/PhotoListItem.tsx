import { GoTrashcan } from "react-icons/go";
import type { Photo } from "../store/apis/photosApi";
import { photosApi } from "../store/apis/photosApi";

type PhotoListItemProps = {
  photo: Photo;
}

function PhotoListItem({ photo }: PhotoListItemProps) {
  const [removePhoto, removePhotoResults] = photosApi.useRemovePhotoMutation();

  const handlePhotoRemove = () => {
    removePhoto(photo)
  }

  return (
    <div onClick={handlePhotoRemove} className="relative cursor-pointer m-2">
      <img src={photo.url} alt="" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  )
}

export default PhotoListItem