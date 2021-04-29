import React from 'react';
import ReadReturnService from '../../../services/readreturn.service';

class ReadReturnBooksListComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            readReturnBooks: []
        }
    }

    componentDidMount(){
        ReadReturnService.getReadReturnBooks().then((response) => {
            this.setState({ readReturnBooks: response.data})
        });
    }

    rentedBooks(){
        this.props.history.push('/rented-books');
    }

    updatePricePerDay(id) {
        this.props.history.push(`/read-and-return-books/${id}`)
    }

    render (){
        return (
            <div>
                <h1 className="text-center"> Read&Return Books</h1>
                <button className="btn btn-outline-warning float-right" onClick={() => this.rentedBooks()}>
                    Now in a rent
                </button>
                <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 16.5rem)", "justify-content": "center"}}>
                    {this.state.readReturnBooks.map(
                        readReturnBook =>
                            <div className="card mt-0" style={{"width" : "15rem", "padding": "0px"}} key={readReturnBook.id}>
                                <div className="text-center">
                                    <img className="card-img-top" src={`data:image/png;base64,${readReturnBook.book.image}`} alt="Card image cap" style={{"width": "150px", "height": "225px"}}></img>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{readReturnBook.book.title}</h5>
                                    <p className="card-text mb-1">{readReturnBook.book.author}</p>
                                    <p className="card-text mb-0">Category: {readReturnBook.book.category}</p>
                                    <p className="card-text mb-1">Price: ${readReturnBook.book.price}</p>
                                    <p className="card-text font-weight-bold">Price per day: ${readReturnBook.pricePerDay}</p>

                                    <button className="btn btn-outline-warning float-right" onClick={() => this.updatePricePerDay(readReturnBook.id)}>Update</button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}

export default ReadReturnBooksListComponent