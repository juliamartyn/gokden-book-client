import React, { Component } from 'react'
import BookService from '../../services/book.service';
import {toast} from "react-toastify";

class AddEBookComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            bookTitle: '',
            eBookFile: '',
            price: ''
        }
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then( (res) =>{
            this.setState({
                bookTitle: res.data.title
            });
        });
    }

    addEBook = (e) => {
        e.preventDefault();

        let eBookRequest = {price: this.state.price};
        const formData = new FormData();
        formData.append('eBookFile', this.state.eBookFile);
        formData.append("eBook", JSON.stringify(eBookRequest));

        BookService.addEBook(this.state.id, formData).then(res => {
            toast('E-Book added');
            this.props.history.push('/book-list');
        });
    };

    onEBookFileChange = (e) => this.setState({eBookFile: e.target.files[0]});

    changePriceHandler = (e) => {this.setState({price: e.target.value});}

    cancel(){
        this.props.history.push('/book-list');
    }

    render() {
        return (
            <div className = "card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center">E-Book '{this.state.bookTitle}'</h3>
                <div className = "card-body">
                    <form>
                        <div>
                            <label>File:</label>
                            <input type="file" name="e-book" className="form-control" onChange={this.onEBookFileChange}/>
                        </div>
                        <div className="mb-3">
                            <label>Price: </label>
                            <input placeholder="$" name="price" className="form-control" value={this.state.price} onChange={this.changePriceHandler}/>
                        </div>

                        <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>
                        <button className="btn btn-success float-right" onClick={this.addEBook}>Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddEBookComponent