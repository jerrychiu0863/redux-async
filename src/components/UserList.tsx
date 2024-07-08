import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";

export default function UserList() {
  const dispatch = useAppDispatch()
  const { isLoading, data, error } = useAppSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])


  if (isLoading) {
    return <Skeleton times={6} className="h-10 w-full" />
  }

  if (error) {
    return <>{error.message}</>
  }

  return <>{data.map(user => {
    return (
      <div key={user.id}>
        {user.name}
      </div>
    )
  })}</>
}