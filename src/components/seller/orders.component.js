import React from 'react';
import OrderService from '../../services/order.service';
import {toast} from "react-toastify";

class OrdersComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            orders: []
        }
    }

    componentDidMount(){
        OrderService.getOrderList().then((response) => {
            this.setState({ orders: response.data})
        });
    }

    changeStatus(orderId) {
        this.props.history.push(`/orders/${orderId}`)
    }

    sendEOrder(orderId){
        OrderService.sendEOrder(orderId).then(() =>{
            toast('Sent');
        });
    }


    render (){
        return (
            <div>
                <h1 className = "text-center"> Orders</h1>
                <br/>
                <br/>
                {
                    this.state.orders.map(order =>
                        <div className="card mt-0" style={{"width": "75%"}} key={order.id}>
                            <div className="card-body">
                                <div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, 18rem)"}}>
                                    <div >
                                        <h5 className="card-title">Order № {order.id}</h5>
                                        <p>Status - {order.status}</p>
                                        <p>Buyer: {order.buyer.username}</p>
                                        <p>Phone number: {order.buyer.phone}</p>
                                        <p>Delivery address: <br/> {order.buyer.deliveryAddress}</p>
                                    </div>

                                    <div>
                                        <h5 className="font-weight-bold">BOOKS</h5>
                                        {order.books.map(book =>
                                            <div>
                                                <div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, 9rem)"}}>
                                                    <img className="card-img-top" src={`data:image/png;base64,${book.image}`} alt="Card image cap" style={{"width": "100px"}}/>
                                                    <div>
                                                        <h5>{book.title}</h5>
                                                        <h5>{book.author}</h5>
                                                        <p>Price ${book.price}</p>
                                                    </div>
                                                </div>
                                                <hr style={{"border": "1px solid #ffc107"}}/>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button className="btn btn-warning" onClick={() => this.changeStatus(order.id)}>Change status</button>
                                {order.status == "E_ORDERED" ?
                                    <button className="btn btn-warning ml-1" onClick={() => this.sendEOrder(order.id)}>Send email with E-Book</button>
                                : ''}
                                <p className="card-text float-right font-weight-bold">Total Price: ${order.totalPrice}</p>
                            </div>
                        </div>
                    )
                }
            </div>

        )
    }
}

export default OrdersComponent