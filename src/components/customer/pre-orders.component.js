import React from 'react';
import OrderService from '../../services/order.service';
import moment from "moment";
import {toast} from "react-toastify";

class PreOrdersComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            preOrders: []
        }
    }

    componentDidMount(){
        OrderService.getPreOrders().then((response) => {
            this.setState({ preOrders: response.data})
        });
    }

    confirmPreOrder(orderId){
        OrderService.confirmPreOrder(orderId).then(res =>{
            toast('Ordered');
            window.location.reload();
        });
    }

    cancelPreOrder(orderId){
        OrderService.cancelPreOrder(orderId).then(res =>{
            toast('Pre order canceled');
            window.location.reload();
        });
    }

    openCart() {
        this.props.history.push('/cart');
    }

    render (){
        return (
            <div>
                <button className="btn btn-outline-warning float-right" onClick={() => this.openCart()}>My cart</button>
                <br></br>
                <h1 className = "text-center mt-3"> Pre-Orders</h1>
                <br></br>
                {
                    this.state.preOrders.length != 0 ?
                        this.state.preOrders.map(preOrder =>
                            <div className="card mt-0" style={{"width": "70%"}} key={preOrder.id}>
                                <div className="card-body">
                                    <div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, 18rem)"}}>
                                        <div>
                                            <h5 className="card-title">Pre-Order № {preOrder.id}</h5>
                                            <p>Status - {preOrder.status}</p>
                                        </div>

                                        <div>
                                            {preOrder.books.map(book =>
                                                <div>
                                                    <div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, 9rem)", "margin-bottom": "20px"}}>
                                                        <img className="card-img-top" src={`data:image/png;base64,${book.image}`} alt="Card image cap" style={{"width": "100px"}}></img>
                                                        <div>
                                                            <h5>{book.title}</h5>
                                                            <h5>{book.author}</h5>
                                                            <p>Price ${book.price}</p>
                                                        </div>
                                                    </div>

                                                    { !(moment().isSameOrBefore(moment(book.startSaleDate))) ?
                                                        <button className="btn btn-warning" onClick={() => this.confirmPreOrder(preOrder.id)}>Order now</button>
                                                        : <p>We will notify you when the book will be available for order</p>
                                                    }

                                                    <button className="btn btn-outline-danger float-right" onClick={() => this.cancelPreOrder(preOrder.id)}>Cancel pre-order</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        : <p className="text-center">You have no pre orders yet.</p>
                }
            </div>
        )
    }
}

export default PreOrdersComponent