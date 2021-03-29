import React from 'react';
import BookService from '../../services/book.service';
import OrderService from '../../services/order.service';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    orderBook(bookId) {
        OrderService.orderBook(bookId).then(response =>{
            toast('Added to cart');
        });
    }

    checkIfAvailable(bookQuantity){
        if(bookQuantity === 0){
            return true;
        } else {
            return false;
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
                                            <a href="#" className="btn btn-warning btn-block" onClick={() => this.orderBook(book.id)} disabled={this.checkIfAvailable(book.quantity)}>Add to cart</a>
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