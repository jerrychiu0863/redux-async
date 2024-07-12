import type { User } from "../type";

type AblumsListProps = {
  user: User;
}

function AlbumsList({ user }: AblumsListProps) {
  return (
    <div>{user.name}</div>
  )
}

export default AlbumsList