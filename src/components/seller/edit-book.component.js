import React, { Component } from 'react'
import BookService from '../../services/book.service';

class EditBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            price: '',
            quantity: ''
        }
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.updateBookPrice= this.updateBookPrice.bind(this);
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then( (res) =>{
            let book = res.data;
            this.setState({
                price: book.price,
                quantity: book.quantity
            });
        });
    }

    updateBookPrice = (e) => {
        e.preventDefault();
        let book = {price: this.state.price};
        let id = this.state.id;
        BookService.updateBookPrice(id, book).then( res => {
            this.props.history.push('/book-list');
        });
    }

    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    updateBookQuantity = (e) => {
        e.preventDefault();
        let book = {quantity: this.state.quantity};
        let id = this.state.id;
        BookService.updateBookQuantity(id, book).then( res => {
            this.props.history.push('/book-list');
        });
    }

    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }

    cancel(){
        this.props.history.push('/book-list');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Book</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Price: </label>
                                        <input placeholder="price" name="price" className="form-control"
                                               value={this.state.price} onChange={this.changePriceHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateBookPrice}>Save</button>

                                    <div className = "form-group">
                                        <label> Quantity: </label>
                                        <input placeholder="quantity" name="quantity" className="form-control"
                                               value={this.state.quantity} onChange={this.changeQuantityHandler}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateBookQuantity}>Save</button>

                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "300px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditBookComponent