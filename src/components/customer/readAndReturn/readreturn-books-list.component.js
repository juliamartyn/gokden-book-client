import React from 'react';
import ReadReturnService from '../../../services/readreturn.service';

class ReadReturnBooksListComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            readReturnBooks: []
        }
    }

    componentDidMount(){
        ReadReturnService.getReadReturnBooks().then((response) => {
            this.setState({ readReturnBooks: response.data})
        });
    }

    rentBook(id){
        this.props.history.push(`/read-and-return/rent/${id}`);
    }

    render (){
        return (
            <div>
                <h1 className="text-center  pb-3"> Read&Return Books</h1>
                <div className="jumbotron text-center p-3">
                    <p className="font-weight-bold">You can take a book for some period  of time and then return it.</p>
                    <p>Choose book -> Enter rent days number -> Get the book -> Read it -> Return book</p>

                    <p className="font-italic small">*you should pay a full selling price for a book if you want to use the feature. After a book will be returned seller will return you partial chargeback.</p>
                </div>
                <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 16.5rem)", "justify-content": "center"}}>
                    {this.state.readReturnBooks.map(
                        readReturnBook =>
                            <div className="card mt-0" style={{"width" : "15rem", "padding": "0px"}} key={readReturnBook.id}>
                                <div className="text-center">
                                    <img className="card-img-top" src={`data:image/png;base64,${readReturnBook.book.image}`} style={{"width": "150px", "height": "225px"}}/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{readReturnBook.book.title}</h5>
                                    <p className="card-text mb-1">{readReturnBook.book.author}</p>
                                    <p className="card-text mb-0">Category: {readReturnBook.book.category}</p>
                                    <p className="card-text mb-1">Price: ${readReturnBook.book.price}</p>
                                    <p className="card-text font-weight-bold">Price per day: ${readReturnBook.pricePerDay}</p>
                                    <button className="btn btn-warning btn-block" onClick={() => this.rentBook(readReturnBook.id)}>Rent</button>
                                </div>
                            </div>
                    )}
                </div>
            </div>
        )
    }
}

export default ReadReturnBooksListComponent