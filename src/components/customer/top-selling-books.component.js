import React from 'react';
import BookService from '../../services/book.service';
import OrderService from '../../services/order.service';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class AllBooksComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            booksFiction: [],
            booksFantasy: [],
            booksCrime: [],
            booksBiography: [],
            booksHistory: [],
            booksCooking: []
        }
    }

    componentDidMount(){
        BookService.getTopBooksByCategory(1).then((response) => {
            this.setState({ booksFiction: response.data})
        });
        BookService.getTopBooksByCategory(2).then((response) => {
            this.setState({ booksFantasy: response.data})
        });
        BookService.getTopBooksByCategory(3).then((response) => {
            this.setState({ booksCrime: response.data})
        });
        BookService.getTopBooksByCategory(4).then((response) => {
            this.setState({ booksBiography: response.data})
        });

    }

    orderBook(bookId) {
        OrderService.orderBook(bookId).then(response =>{
            toast('Added to cart');
        });
    }

    bookDetails(bookId){
        this.props.history.push(`/books/${bookId}/details`);
    }

    bookCard(book){
        return <div className="card mt-0" style={{"width": "15rem", "padding": "0px"}} key={book.id}>
            <div className="text-center">
                <img className="card-img-top" src={`data:image/png;base64,${book.image}`}
                     alt="Card image cap" style={{"width": "150px", "height": "225px"}}></img>
            </div>
            <div className="card-body">
                <a className="card-title mb-0 font-weight-bold" style={{"font-size": "18px"}} onClick={() => this.bookDetails(book.id)}>{book.title}</a>
                <p className="card-text">{book.author}</p>
                {book.priceWithDiscount == book.price ? <p className="card-text">${book.price}</p> :
                    <p className="card-text"><del className="text-danger">${book.price}</del> ${book.priceWithDiscount}</p>
                }
                <button className="btn btn-warning btn-block"
                        onClick={() => this.orderBook(book.id)} disabled={book.quantity === 0}>Add to cart</button>
            </div>
        </div>
    }


    render (){
        return (
            <div>
                <h2 className="text-center">Top Selling Books</h2>
                <br></br>
                <br></br>
                <div >
                    <h3> Science Fiction</h3>
                    <hr style={{"border": "1px solid #ffc107"}}></hr>
                    <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 16.5rem)", "justify-content": "center"}}>
                    {this.state.booksFiction.map(
                            book =>
                                this.bookCard(book)
                    )}
                    </div>
                    <h3> Fantasy</h3>
                    <hr style={{"border": "1px solid #ffc107"}}></hr>
                    <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 16.5rem)", "justify-content": "center"}}>
                    {this.state.booksFantasy.map(
                        book =>
                            this.bookCard(book)
                    )}
                    </div>
                    <h3> Crime</h3>
                    <hr style={{"border": "1px solid #ffc107"}}></hr>
                    <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 16.5rem)", "justify-content": "center"}}>
                    {this.state.booksCrime.map(
                            book =>
                                this.bookCard(book)
                    )}
                    </div>
                    <h3> Biography</h3>
                    <hr style={{"border": "1px solid #ffc107"}}></hr>
                    <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 16.5rem)", "justify-content": "center"}}>
                    {this.state.booksBiography.map(
                        book =>
                            this.bookCard(book)
                    )}
                    </div>
                </div>
            </div>
        )
    }
}

export default AllBooksComponent