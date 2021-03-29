import React, { Component } from 'react'
import OrderService from '../../services/order.service';

class UpdateOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            status: ''
        }
        this.updateOrderStatus= this.updateOrderStatus.bind(this);
    }

    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    updateOrderStatus = (e) => {
        e.preventDefault();
        let status = {status: this.state.status};
        let id = this.state.id;
        OrderService.updateOrderStatus(id, status).then( res => {
            this.props.history.push('/orders');
        });
    }

    cancel(){
        this.props.history.push('/orders');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Order Status</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Status: </label>
                                        <select name="status" onChange={this.changeStatusHandler}>
                                            <option value="SENT">SENT</option>
                                            <option value="RECEIVED">RECEIVED</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateOrderStatus}>Save</button>
                                    <button className="btn btn-danger float-right" onClick={this.cancel.bind(this)}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateOrderComponent