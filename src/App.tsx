import UserList from "./components/UserList"
import { useAppSelector } from "./hooks"

function App() {
  // const state = useAppSelector(state => state.users)
  // console.log(JSON.stringify(state))
  return (
    <div className="container mx-auto pt-4">
      <UserList />
    </div>
  )
}

export default App
