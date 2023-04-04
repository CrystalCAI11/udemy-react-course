import { Component, useState } from "react"
import User from "./User"

import classes from "./Users.module.css"

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

class Users extends Component {
	constructor() {
		super()
		// initialize state
		this.state = {
			showUsers: true,
		}
		// https://legacy.reactjs.org/docs/handling-events.html
		this.toggleUsersHandler = this.toggleUsersHandler.bind(this)
	}

	componentDidUpdate() {
		if (this.props.users.length === 0) {
			throw new Error("No users provided!")
		}
	}

	toggleUsersHandler() {
		this.setState((curState) => {
			return { showUsers: !curState.showUsers }
		})
	}

	render() {
		const usersList = (
			<ul>
				{this.props.users.map((user) => (
					<User key={user.id} name={user.name} />
				))}
			</ul>
		)

		return (
			<div className={classes.users}>
				<button onClick={this.toggleUsersHandler}>
					{this.state.showUsers ? "Hide" : "Show"} Users
				</button>
				{this.state.showUsers && usersList}
			</div>
		)
	}
}

export default Users
