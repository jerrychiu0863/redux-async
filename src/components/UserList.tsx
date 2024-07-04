type User = {
  name: string;
}

type UserListProps = {
  lists?: User[];
}

export default function UserList({ lists = [] }: UserListProps) {
  return <>{lists.map(list => {
    return (
      <div key={list.name}>
        {list.name}
      </div>
    )
  })}</>
}