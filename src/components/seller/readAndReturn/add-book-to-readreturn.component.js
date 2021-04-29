import React, { Component } from 'react'
import ReadReturnService from '../../../services/readreturn.service';

class AddBookToReadReturnComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: this.props.match.params.id,
            pricePerDay: '',
        }
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.addToReadAndReturn= this.addToReadAndReturn.bind(this);
    }

    addToReadAndReturn = (e) => {
        e.preventDefault();
        let request = {
            bookId: this.state.bookId,
            pricePerDay: this.state.pricePerDay};
        ReadReturnService.addToReadAndReturn(request).then( res => {
            this.props.history.push('/book-list');
        });
    }

    changePriceHandler= (event) => {
        this.setState({pricePerDay: event.target.value});
    }

    cancel(){
        this.props.history.push('/book-list');
    }

    render() {
        return (
            <div>
                <br/>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Set Price per date for 'Read&Return' book</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>Price per day: </label>
                                        <input placeholder="$" name="price" className="form-control" onChange={this.changePriceHandler}/>
                                    </div>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>
                                    <button className="btn btn-success float-right" onClick={this.addToReadAndReturn}>Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddBookToReadReturnComponent