import React, { Component } from 'react'
import UserService from "../../services/user.service";

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            email: '',
            phone: '',
            role: '',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password, email: this.state.email, phone: this.state.phone, role: this.state.role};
        UserService.addUser(user)
            .then(res => {
                this.props.history.push('/user-list');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    onChangeRole = (e) =>
        this.setState({ role: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Create User</h2>
                <form>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" placeholder="username" name="username" className="form-control" value={this.state.username} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input placeholder="email" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Phone:</label>
                        <input placeholder="(xxx)xxx-xxxx" type="text" name="phone" className="form-control" value={this.state.phone} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Role:</label>
                        <select name="roles" id="roles" onChange={this.onChangeRole}>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                            <option value="ROLE_SELLER">ROLE_SELLER</option>
                            <option value="ROLE_CUSTOMER">ROLE_CUSTOMER</option>
                        </select>
                    </div>

                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                </form>
            </div>
        );
    }
}

export default AddUserComponent;