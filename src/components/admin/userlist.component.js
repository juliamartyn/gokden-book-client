import React from 'react';
import UserService from '../../services/user.service';

class UserListComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users: []
        }
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount(){
        UserService.getUserList().then((response) => {
            this.setState({ users: response.data})
        });
    }

    addUser() {
        this.props.history.push('/add-user');
    }

    updateUser(id) {
        this.props.history.push(`/users/${id}`);
    }

    updateBlocked(id, isDisabled) {
        let disabledRequest;
        if(isDisabled === false) {
            disabledRequest = {
                "disabled": true
            };
        } else {
            disabledRequest = {
                "disabled": false
            };
        }

        UserService.updateUserDisabled(id, disabledRequest).then( res => {
            window.location.reload();
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Users</h1>
                <button className="btn btn-warning" onClick={() => this.addUser()}> Create User</button>
                <br></br>
                <br></br>
                <table className = "table table-striped">
                    <thead>
                    <tr>
                        <th> Id</th>
                        <th> UserName</th>
                        <th> Email</th>
                        <th> Update</th>
                        <th> Block/Unblock</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key = {user.id}>
                                    <td> {user.id}</td>
                                    <td> {user.username}</td>
                                    <td> {user.email}</td>
                                    <td>
                                        <button className="btn btn-outline-info" onClick={() => this.updateUser(user.id)}>Update</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger btn-block" onClick={() => this.updateBlocked(user.id,user.disabled)}>
                                            {user.disabled ? 'Unblock' : 'Block'}
                                        </button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        )
    }
}

export default UserListComponent