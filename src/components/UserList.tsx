import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

export default function UserList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [errorLoadingUsers, setErrorLoadingUsers] = useState<null | { message: string }>(null)
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(state => state.users)


  useEffect(() => {
    setIsLoadingUsers(true)
    // dispatch thunk function returns a promise that doesn't work in the tradiontion way
    // using unwrap to return a new promise that can use then and catch methods
    dispatch(fetchUsers())
      .unwrap()
      .then(() => { setIsLoadingUsers(false) })
      .catch((error) => { setIsLoadingUsers(false); setErrorLoadingUsers(error) })
  }, [dispatch])

  const handleUserAdd = () => {
    dispatch(addUser())
  }

  const renderUsers = data.map(({ id, name }) => {
    return (
      <div key={id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          <div>{name}</div>
          <div>X</div>
        </div>
      </div>
    )
  })


  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />
  }

  if (errorLoadingUsers) {
    return <>{errorLoadingUsers.message}</>
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <p>Users</p>
        <Button primary onClick={handleUserAdd}>Add User</Button>
      </div>
      {renderUsers}
    </>
  )
}