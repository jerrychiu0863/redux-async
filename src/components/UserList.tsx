import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers, addUser, deleteUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";
import { User } from "../store/slices/userSlice";


export default function UserList() {
  const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(fetchUsers);
  const [doAddUser, isAddingUser, addUserError] = useThunk(addUser)
  // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  // const [loadingUsersError, setLoadingUsersError] = useState<null | { message: string }>(null)
  // const [isCreatingUser, setIsCreatingUser] = useState(false)
  // const [creatingUsersError, setCreatingUsersError] = useState<null | { message: string }>(null)
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(state => state.users)


  useEffect(() => {
    doFetchUser()
  }, [dispatch])

  const handleUserAdd = () => {
    doAddUser()
  }

  const handleUserDelete = (user: User) => {
    dispatch(deleteUser(user))
  }

  let content;
  if (isLoadingUser) {
    content = <Skeleton times={6} className="h-10 w-full" />
  } else if (loadingUserError) {
    const { message } = loadingUserError
    content = <>{message}</>
  } else {
    content = data.map((user) => {
      const { id, name } = user
      return (
        <div key={id} className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            <div className="flex items-center"><Button onClick={() => handleUserDelete(user)} className="mr-3">X</Button>{name}</div>
            <div>V</div>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <p>Users</p>
        <Button primary onClick={handleUserAdd} loading={isAddingUser}>Add User</Button>
        {addUserError && 'Creating user error'}
      </div>
      {/* {isLoadingUser && <Skeleton times={6} className="h-10 w-full" />}
      {loadingUserError && 'Error'}
      {(!isAddingUser && !loadingUserError) && renderUsers} */}
      {content}
    </>
  )
}