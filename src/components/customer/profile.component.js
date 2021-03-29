import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service"

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: " "
        };
    }

    componentDidMount() {
        UserService.getUserById(AuthService.getCurrentUser().id).then(response => {
            this.setState({ currentUser: response.data})
        });
    }

    updateDeliveryAddress(id) {
        this.props.history.push(`/users/${id}/delivery-address`);
    }

    render() {
        return (
            <div className="container">
                    <div>
                        <div className="jumbotron">
                            <h3 className="text-center">
                                Hello, {this.state.currentUser.username}
                            </h3>
                        </div>
                        <div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, 30rem)"}}>
                            <div>
                                <p>
                                    <strong>Username:</strong>{" "}
                                    {this.state.currentUser.username}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {this.state.currentUser.email}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Delivery address:</strong>{" "}
                                    {this.state.currentUser.deliveryAddress}
                                </p>
                                <button className="btn btn-outline-info btn-block" onClick={() => this.updateDeliveryAddress(this.state.currentUser.id)}>
                                    {this.state.currentUser.deliveryAddress ? 'Change delivery address' : 'Set delivery address'}
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
