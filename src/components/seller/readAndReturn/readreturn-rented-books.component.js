import React from 'react';
import ReadReturnService from '../../../services/readreturn.service';

class RentedBooks extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            rentedBooks: []
        }
    }

    componentDidMount(){
        ReadReturnService.getRentedBooks().then((response) => {
            this.setState({ rentedBooks: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className="text-center"> Read&Return Rented Books</h1>
                <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 16.5rem)", "justify-content": "center"}}>
                    {this.state.rentedBooks.map(
                        rentedBook =>
                            <div className="card mt-0" style={{"width" : "15rem", "padding": "0px"}}>
                                <div className="text-center">
                                    <img className="card-img-top" src={`data:image/png;base64,${rentedBook.book.book.image}`} alt="Card image cap" style={{"width": "150px", "height": "225px"}}></img>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{rentedBook.book.book.title}</h5>
                                    <p className="card-text">{rentedBook.book.book.author}</p>
                                    <p className="card-text mb-0">Price: ${rentedBook.book.book.price}</p>
                                    <p className="card-text">Price per day: ${rentedBook.book.pricePerDay}</p>
                                    <p className="card-text font-weight-bold">Will return at: {rentedBook.expectedReturnDate}</p>
                                </div>
                            </div>
                    )}
                </div>
            </div>
        )
    }
}

export default RentedBooks