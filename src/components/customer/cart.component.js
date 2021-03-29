import React from 'react';
import OrderService from '../../services/order.service';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class CartComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            status: '',
            totalPrice: '',
            buyer: '',
            books: []
        }
    }

    componentDidMount(){
        OrderService.getCart().then((response) => {
            this.setState({
                id: response.data.id,
                status: response.data.status,
                totalPrice: response.data.totalPrice,
                buyer: response.data.buyer,
                books: response.data.books
            })
        });
    }

    confirmOrder() {
        OrderService.confirmOrder(this.state.id).then(response =>{
            toast('Ordered');
            window.location.reload();
        });
    }

    deleteBookFromCart(bookId) {
        OrderService.deleteBookFromCart(this.state.id, bookId).then(r => {
            window.location.reload();
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Cart</h1>
                <br></br>
                <br></br>
                {this.state.books.length !== 0 ?
                        <div className="card mt-0" style={{"width": "75%"}}>
                            <div className="card-body">
                                {this.state.books.map(book =>
                                    <div>
                                        <button className="btn btn-outline-danger float-right" onClick={() => this.deleteBookFromCart(book.id)}>x</button>
                                        <div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, 15rem)"}}>
                                            <img className="card-img-top" src={`data:image/png;base64,${book.image}`} alt="Card image cap" style={{"width": "130px", "height": "200px"}}></img>
                                           <div>
                                            <h5>{book.title} - {book.author}</h5>
                                            <p>Price ${book.price}</p>
                                           </div>
                                        </div>
                                        <hr style={{"border": "1px solid #ffc107"}}></hr>
                                    </div>

                                )}
                                <div className="float-right">
                                    <p className="card-text font-weight-bold">Total Price: ${this.state.totalPrice}</p>
                                    <button className="btn btn-warning float-right" onClick={() => this.confirmOrder()}>Order</button>
                                </div>
                            </div>
                        </div>
                        : <p className="text-center">There are no items in your shopping cart.</p>
                }
            </div>
        )
    }
}

export default CartComponent