import type { User } from "../store/slices/userSlice"
import Button from "./Button"
import { deleteUser } from "../store"
import { GoTrashcan } from "react-icons/go"
import { useThunk } from "../hooks/use-thunk"

type UserListItemProps = {
  user: User;
}

export default function UserListItem({ user }: UserListItemProps) {
  const [doDeleteUser, isDeletingUser, deleteUserError] = useThunk(deleteUser)
  const { name } = user

  const handleUserDelete = (user: User) => {
    doDeleteUser(user)
  }

  return (
    <div>
      <div className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          <div className="flex items-center">
            <Button onClick={() => handleUserDelete(user)} className="mr-3" loading={isDeletingUser}>
              <GoTrashcan />
            </Button>{name}
          </div>
          <div>V</div>
        </div>
      </div>
    </div>
  )
}

