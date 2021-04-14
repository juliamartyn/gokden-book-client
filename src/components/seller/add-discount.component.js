import React, { Component } from 'react'
import BookService from '../../services/book.service';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class AddDiscountComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            discount: '',
            dueDate: '',
            books: [],
            checkedBooks: [],
            currentPage: 1
        }
        this.applyDiscount = this.applyDiscount.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentDidMount(){
        this.findPageableBooks(this.state.currentPage);
    }

    findPageableBooks(page){
        page -= 1;
        BookService.getPageableBooks(page).then((response) => {
            let data = response.data;
            this.setState({
                books: data.bookList,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.currentPage + 1
            })
        });
    }

    handleChangeDate(date) {
        this.setState({ dueDate: date })
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });


    applyDiscount = (e) => {
        e.preventDefault();

        let discountRequest = {
            discount: this.state.discount,
            dueDate: this.state.dueDate,
            booksId: this.state.checkedBooks
        }

        BookService.addDiscount(discountRequest).then(res => {
            toast('Discount applied');
        });
    };

    handleChange = (event) => {
        let itemId = event.target.value;

        if(event.target.checked === true){
            this.state.checkedBooks.push(itemId);
            this.setState({ checkedBooks: this.state.checkedBooks });
        } else {
            let items = this.state.checkedBooks.filter(item => item !== itemId);
            this.setState({ checkedBooks: items });
        }
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Create Discount</h2>
                <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 25rem)", "justify-content": "center"}}>
                    <div>
                        <div className="form-group w-75">
                            <label>Discount %:</label>
                            <input placeholder="discount" name="discount" className="form-control" value={this.state.discount} onChange={this.onChange}/>
                        </div>

                        <div className="form-group w-75">
                            <label>Due date (not including):</label>
                            <DatePicker placeholder="top to choose date" selected={ this.state.dueDate } onChange={this.handleChangeDate}
                                        dateFormat="MMMM d, yyyy"/>
                        </div>
                    </div>
                    <div>
                        BOOKS
                        <hr style={{"border": "1px solid #ffc107"}}></hr>
                        {this.state.books.map(book =>
                            <label>
                                <input type="checkbox" value={book.id} onChange={this.handleChange} key={book.id}/>
                                  ID {book.id} | {book.title} - {book.author}
                            </label>
                        )}

                        <div className="text-center">
                            <button className=" btn btn-outline-info" disabled={this.state.currentPage === 1 ? true : false}
                                    onClick={() => this.findPageableBooks(this.state.currentPage - 1)}> Prev </button>
                            <button className="btn btn-outline-info" disabled={this.state.currentPage === this.state.totalPages ? true : false}
                                    onClick={() => this.findPageableBooks(this.state.currentPage + 1)}> Next </button>
                            <p>Page {this.state.currentPage} of {this.state.totalPages}</p>
                        </div>
                    </div>
                </div>
                <button className="btn btn-success float-right" onClick={this.applyDiscount}>Apply</button>
            </div>
        );
    }
}

export default AddDiscountComponent;