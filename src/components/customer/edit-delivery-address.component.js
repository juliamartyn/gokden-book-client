import React, { Component } from 'react'
import UserService from "../../services/user.service";

class EditUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            deliveryAddress: ''
        }
        this.changeDeliveryAddressHandler = this.changeDeliveryAddressHandler.bind(this);
        this.updateDeliveryAddress = this.updateDeliveryAddress.bind(this);
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
            this.setState({
                deliveryAddress: user.deliveryAddress,
            });
        });
    }

    updateDeliveryAddress = (e) => {
        e.preventDefault();
        let userAddress = {deliveryAddress: this.state.deliveryAddress};
        let id = this.state.id;
        UserService.updateDeliveryAddress(id, userAddress).then( res => {
            this.props.history.push('/profile');
        });
    }

    changeDeliveryAddressHandler= (event) => {
        this.setState({deliveryAddress: event.target.value});
    }

    cancel(){
        this.props.history.push('/profile');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Your Delivery Address</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> New Delivery Address: </label>
                                        <input placeholder="address" name="address" className="form-control"
                                               value={this.state.deliveryAddress} onChange={this.changeDeliveryAddressHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateDeliveryAddress}>Save</button>
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