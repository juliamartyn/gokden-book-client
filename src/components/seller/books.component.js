import React from 'react';
import BookService from '../../services/book.service';

class BookListComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            books: []
        }
        this.updateBook= this.updateBook.bind(this)
    }

    componentDidMount(){
        BookService.getBookList().then((response) => {
            this.setState({ books: response.data})
        });
    }

    addBook() {
        this.props.history.push('/add-book');
    }

    updateBook(id) {
        this.props.history.push(`/books/${id}`)
    }

    deleteBook(id) {
        BookService.deleteBook(id).then(r => {
            window.location.reload();
        });
    }

    discount() {
        this.props.history.push('/discount');
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Books</h1>
                <button className="btn btn-warning" onClick={() => this.addBook()}> Create Book</button>
                <button className="btn btn-outline-warning ml-3" onClick={() => this.discount()}>Create discount</button>
                <table className="table table-striped text-center mt-4">
                    <thead>
                    <tr>
                        <th> Id</th>
                        <th> Title</th>
                        <th> Author</th>
                        <th> Category</th>
                        <th> Description</th>
                        <th> Price</th>
                        <th> Quantity</th>
                        <th> Actions</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        this.state.books.map(
                            book =>
                                <tr key = {book.id}>
                                    <td> {book.id}</td>
                                    <td> {book.title}</td>
                                    <td> {book.author}</td>
                                    <td> {book.category}</td>
                                    <td> {book.description}</td>
                                    <td> {book.price}</td>
                                    <td> {book.quantity}</td>
                                    <td>
                                        <button className="btn btn-outline-info" onClick={() => this.updateBook(book.id)}>Update</button>
                                        <button className="btn btn-outline-danger" onClick={() => this.deleteBook(book.id)} style={{marginLeft: "10px"}}>Delete</button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

            </div>

        )
    }
}

export default BookListComponent