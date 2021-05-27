import React, { Component } from 'react'
import BookService from '../../services/book.service';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class AddBookComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            title: '',
            author: '',
            category: '',
            description: '',
            price: '',
            quantity: '',
            startSaleDate: '',
            image: '',
            eBook: '',
            eBookPrice: ''
        }
        this.saveBook = this.saveBook.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    handleChangeDate(date) {
        this.setState({
            startSaleDate: date
        })
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onImageChange = (e) => this.setState({image: e.target.files[0]});

    onEBookChange = (e) => this.setState({eBook: e.target.files[0]});

    onChangeEBookPrice = (e) =>{this.setState({eBookPrice: e.target.value});}

    saveBook = (e) => {
        e.preventDefault();

        let bookRequest = {
            title: this.state.title,
            author: this.state.author,
            category: this.state.category,
            description: this.state.description,
            price: this.state.price,
            quantity: this.state.quantity,
            startSaleDate: this.state.startSaleDate,
            ebookPrice: this.state.eBookPrice
        }
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('eBookFile', this.state.eBook);
        formData.append("book", JSON.stringify(bookRequest));

        BookService.addBook(formData).then(res => {
            toast('Book created successfully');
        });
    };

    render() {
        return(
            <div>
                <h2 className="text-center">Add new book</h2>
                <div  style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, 30rem)", "justify-content": "center"}}>
                    <div>
                    <div className="form-group w-75">
                        <label>Title:</label>
                        <input type="text" placeholder="title" name="title" className="form-control" value={this.state.title} onChange={this.onChange}/>
                    </div>

                    <div className="form-group w-75">
                        <label>Author:</label>
                        <input type="text" placeholder="author" name="author" className="form-control" value={this.state.author} onChange={this.onChange}/>
                    </div>

                    <div className="form-group w-75">
                        <label>Category:</label>
                        <input placeholder="category" name="category" className="form-control" value={this.state.category} onChange={this.onChange}/>
                    </div>

                    <div className="form-group w-75">
                        <label>Description:</label>
                        <input placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.onChange}/>
                    </div>
                    </div>

                    <div>
                    <div className="form-group w-75">
                        <label>Price:</label>
                        <input placeholder="price" name="price" className="form-control" value={this.state.price} onChange={this.onChange}/>
                    </div>

                    <div className="form-group w-75">
                        <label>Quantity:</label>
                        <input type="numeric" placeholder="quantity" name="quantity" className="form-control" value={this.state.quantity} onChange={this.onChange}/>
                    </div>

                    <div className="form-group w-75">
                        <label>Image:</label>
                        <input type="file" name="image" className="form-control" onChange={this.onImageChange}/>
                    </div>

                    <div className="form-group w-75">
                        <label>Start selling date:</label>
                        <DatePicker selected={ this.state.startSaleDate } onChange={ this.handleChangeDate }
                                    dateFormat="MMMM d, yyyy"/>
                    </div>
                    </div>

                    <div  className="form-group w-75">
                    <h3 className="text-center">E-Book</h3>
                        <div>
                            <label>E-Book File:</label>
                            <input type="file" name="e-book" className="form-control" onChange={this.onEBookChange}/>
                        </div>
                        <div>
                            <label>E-Book Price:</label>
                            <input name="e-book-price" className="form-control" value={this.state.eBookPrice} onChange={this.onChangeEBookPrice}/>
                        </div>
                    </div>
                </div>
                <button className="btn btn-success float-right w-25" onClick={this.saveBook}>Save</button>

            </div>
        );
    }
}

export default AddBookComponent;