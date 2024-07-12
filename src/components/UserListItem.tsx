// types
import type { User } from "../type";
// redux
import { deleteUser } from "../store";
// hook
import { useThunk } from "../hooks/use-thunk";
// components
import Button from "./Button";
import AlbumsList from "./AlbumsList";
import { GoTrashcan } from "react-icons/go";
import ExpandablePanel from './ExpandablePanel';


type UserListItemProps = {
  user: User;
}

export default function UserListItem({ user }: UserListItemProps) {
  const [doDeleteUser, isDeletingUser, deleteUserError] = useThunk(deleteUser);
  const { name } = user

  const handleUserDelete = (user: User) => {
    doDeleteUser(user)
  }

  const header =
    <>
      <Button onClick={() => handleUserDelete(user)} className="mr-3" loading={isDeletingUser}>
        <GoTrashcan />
      </Button>
      {name}
    </>

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  )
}

