import "./UsersList.css"
import { Card } from "../UI/Card"

export const UsersList = (props) => {
  if (props.users.length > 0) {
    return (
      <Card className="users">
        <ul>
          {props.users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.age} years old)
            </li>
          ))}
        </ul>
      </Card>
    )
  } else {
    return <div></div>
  }
}
