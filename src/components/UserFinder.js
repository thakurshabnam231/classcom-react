import { Fragment, Component } from 'react';
import classes from './UserFinder.module.css'
import Users from './Users';
import UsersContext from '../Store/UsersContext'
import ErrorBoundary from './ErrorBoundary'

class UserFinder extends Component {
    static contextType = UsersContext;
    constructor() {
        super()
        this.state = {
            searchTerm: '',
            filteredUsers: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                filteredUsers: this.context.users.filter((user) =>
                    user.name.includes(this.state.searchTerm))
            })
        }
    }

    searchChangeHandler(event) {
        this.setState({ searchTerm: event.target.value })
    }

    render() {
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type='search' onChange={this.searchChangeHandler.bind(this)} /></div>
                    <ErrorBoundary>
                <Users users={this.state.filteredUsers} />
                </ErrorBoundary>
            </Fragment>
        );
    };
}


export default UserFinder;