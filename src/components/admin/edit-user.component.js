import React, { Component } from 'react'
import UserService from "../../services/user.service";

class EditUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: ''
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
            this.setState({
                username: user.username,
            });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username};
        let id = this.state.id;
        UserService.updateUser(id, user).then( res => {
            this.props.history.push('/user-list');
        });
    }

    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    cancel(){
        this.props.history.push('/user-list');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update User</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Username: </label>
                                        <input placeholder="Username" name="username" className="form-control"
                                               value={this.state.username} onChange={this.changeUsernameHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateUser}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditUserComponent