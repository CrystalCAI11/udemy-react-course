import { Fragment, useState, useEffect, Component } from "react"
import Users from "./Users"
import classes from "./UserFinder.module.css"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./ErrorFallback"

const DUMMY_USERS = [
	{ id: "u1", name: "Max" },
	{ id: "u2", name: "Manuel" },
	{ id: "u3", name: "Julie" },
]

class UserFinder extends Component {
	constructor() {
		super()
		this.state = {
			filteredUsers: [],
			searchTerm: "",
		}
		this.searchChangeHandler = this.searchChangeHandler.bind(this)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchTerm !== this.state.searchTerm) {
			this.setState({
				filteredUsers: DUMMY_USERS.filter((user) =>
					user.name.includes(this.state.searchTerm)
				),
			})
		}
	}

	componentDidMount() {
		// send http request and set to state
		this.setState({
			filteredUsers: DUMMY_USERS,
		})
	}

	searchChangeHandler(event) {
		this.setState({
			searchTerm: event.target.value,
		})
	}

	render() {
		return (
			<Fragment>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<div className={classes.finder}>
						<input type="search" onChange={this.searchChangeHandler} />
					</div>
					<Users users={this.state.filteredUsers} />
				</ErrorBoundary>
			</Fragment>
		)
	}
}

// const UserFinder = () => {
// 	const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS)
// 	const [searchTerm, setSearchTerm] = useState("")

// 	useEffect(() => {
// 		setFilteredUsers(
// 			DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
// 		)
// 	}, [searchTerm])

// 	const searchChangeHandler = (event) => {
// 		setSearchTerm(event.target.value)
// 	}

// 	return (
// 		<Fragment>
// 			<div className={classes.finder}>
// 				<input type="search" onChange={searchChangeHandler} />
// 			</div>
// 			<Users users={filteredUsers} />
// 		</Fragment>
// 	)
// }

export default UserFinder
