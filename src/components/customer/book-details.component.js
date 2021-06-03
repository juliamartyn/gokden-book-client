import React from 'react';
import BookService from '../../services/book.service';
import OrderService from '../../services/order.service';
import FavoriteService from '../../services/favorite.service';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
toast.configure();

class BookDetailsComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            book: ''
        }
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then((response) => {
            this.setState({ book: response.data})
        });
    }

    ButtonRender(props) {
        const now = moment();
        const startSaleDate = moment(props.date);

        const isAvailableToBuy = !now.isSameOrBefore(startSaleDate);
        if (isAvailableToBuy) {
            return <button className="btn btn-warning float-right"
                           onClick={() => OrderService.orderBook(props.bookId).then(res =>{ toast('Added to cart')})}
                           disabled={props.isDisabled}>Add to cart</button>;
        } else {
            return <button className="btn btn-warning float-right"
                           onClick={() => OrderService.preOrderBook(props.bookId).then(res =>{ toast('Pre ordered successfully')})}
                           disabled={props.isDisabled}>Pre-Order</button>;
        }
    }

    orderEBook(bookId){
        OrderService.orderEBook(bookId).then(res =>{
            toast('Ordered successfully');
        });
    }

    addToFavorite(itemName, type){
        let request ={
            type: type,
            itemName: itemName
        }
        FavoriteService.addToFavorite(request).then(res =>{
            toast('Added to favorite');
        });
    }

    render (){
        return (
            <div>
                {<div className="card mt-0 w-75" key={this.state.book.id}>
                    <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 13rem)"}}>
                    <img className="card-img-top d-inline" src={`data:image/png;base64,${this.state.book.image}`} alt="Card image cap" style={{"width": "150px", "height": "225px"}}></img>
                    <div>
                        <h5 className="card-title">{this.state.book.title}</h5>
                        <div>
                            <p className="card-text mb-1 d-inline">{this.state.book.author}</p>
                            <button className="btn btn-outline-danger p-0  ml-1 border-0" onClick={() => this.addToFavorite(this.state.book.author, "AUTHOR")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                            </button>
                        </div>
                        <p className="card-text mb-1 d-inline">Category: {this.state.book.category}</p>
                        <button className="btn btn-outline-danger p-0 ml-1 border-0" onClick={() => this.addToFavorite(this.state.book.category, "CATEGORY")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </button>
                        {this.state.book.priceWithDiscount == this.state.book.price ? <p className="card-text">Price: ${this.state.book.price}</p> :
                            <p className="card-text">Price: <del className="text-danger">${this.state.book.price}</del> ${this.state.book.priceWithDiscount}</p>
                        }

                        {this.state.book.ebookId != null ?
                            <div>
                                <h5 className="mb-0">E-Book</h5>
                                <p className="mb-1">E-Book price: ${this.state.book.ebookPrice}</p>
                                <button className="btn btn-outline-warning mb-2" onClick={() => this.orderEBook(this.state.book.id)}>Buy E-Book</button>
                            </div> : ''
                        }
                    </div>
                        <div>
                            <p className="mt-4 mb-1 font-weight-bold">Description</p>
                            <p className="mb-1 ">{this.state.book.description}</p>
                        </div>
                    </div>
                    <div>
                        <this.ButtonRender date={this.state.book.startSaleDate} bookId={this.state.book.id} isDisabled={this.state.book.quantity === 0}></this.ButtonRender>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default BookDetailsComponent