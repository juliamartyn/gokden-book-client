import React, { Component } from 'react'
import BookService from '../../services/book.service';

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
            selectedFile: '',
            message: null
        }
        this.saveBook = this.saveBook.bind(this);
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    onFileChange = (e) =>
        this.setState({selectedFile: e.target.files[0]});

    saveBook = (e) => {
        e.preventDefault();

        let bookRequest = {
            title: this.state.title,
            author: this.state.author,
            category: this.state.category,
            description: this.state.description,
            price: this.state.price,
            quantity: this.state.quantity,
        }
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        formData.append("book", JSON.stringify(bookRequest));

        BookService.addBook(formData).then(res => {
                console.log(res.data);
                alert("Book created successfully.");
        });
    };

    render() {
        return(
            <div>
                <h2 className="text-center">Add new book</h2>
                <form>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" placeholder="title" name="title" className="form-control" value={this.state.title} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Author:</label>
                        <input type="text" placeholder="author" name="author" className="form-control" value={this.state.author} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Category:</label>
                        <input placeholder="category" name="category" className="form-control" value={this.state.category} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <input placeholder="description" name="description" className="form-control" value={this.state.description} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Price:</label>
                        <input placeholder="price" name="price" className="form-control" value={this.state.price} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Quantity:</label>
                        <input type="numeric" placeholder="quantity" name="quantity" className="form-control" value={this.state.quantity} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Image:</label>
                        <input type="file" name="file" className="form-control" onChange={this.onFileChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveBook}>Save</button>
                </form>
            </div>
        );
    }
}

export default AddBookComponent;