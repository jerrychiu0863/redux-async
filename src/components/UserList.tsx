import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import UserListItem from "./UserListItem";
import { useThunk } from "../hooks/use-thunk";

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

  let content;
  if (isLoadingUser) {
    content = <Skeleton times={6} className="h-10 w-full" />
  } else if (loadingUserError) {
    const { message } = loadingUserError
    content = <>{message}</>
  } else {
    content = data.map((user) => {
      // const { id, name } = user
      return (<UserListItem key={user.id} user={user} />)
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