import React from 'react';
import BookService from '../../services/book.service';
import OrderService from '../../services/order.service';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
toast.configure();

class BookCatalogComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount(){
        BookService.getBookList().then((response) => {
            this.setState({ books: response.data})
        });
    }

    ButtonRender(props) {
        const now = moment();
        const startSaleDate = moment(props.date);

        const isAvailableToBuy = !now.isSameOrBefore(startSaleDate);
        if (isAvailableToBuy) {
            return <button className="btn btn-warning btn-block"
                           onClick={() => OrderService.orderBook(props.bookId).then(res =>{ toast('Added to cart')})}
                           disabled={props.isDisabled}>Add to cart</button>;
        } else {
            return <button className="btn btn-warning btn-block"
                           onClick={() => OrderService.preOrderBook(props.bookId).then(res =>{ toast('Pre ordered successfully')})}
                           disabled={props.isDisabled}>Pre-Order</button>;
        }
    }


    render (){
        return (
            <div>
                <h1 className="text-center"> Books</h1>
                <br></br>
                <br></br>
                <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 16.5rem)", "justify-content": "center"}}>
                    {
                        this.state.books.map(
                            book =>
                                <div className="card mt-0" style={{"width" : "15rem", "padding": "0px"}} key={book.id}>
                                    <div className="text-center">
                                        <img className="card-img-top" src={`data:image/png;base64,${book.image}`} alt="Card image cap" style={{"width": "150px", "height": "225px"}}></img>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">{book.author}</p>
                                        <p className="card-text">Category: {book.category}</p>
                                        <p className="card-text">${book.price}</p>
                                        <this.ButtonRender date={book.startSaleDate} bookId={book.id} isDisabled={book.quantity === 0}></this.ButtonRender>
                                    </div>
                                </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default BookCatalogComponent