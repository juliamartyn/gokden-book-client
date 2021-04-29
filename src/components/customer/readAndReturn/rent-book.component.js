import React, { Component } from 'react';
import ReadReturnService from '../../../services/readreturn.service';
import {toast} from "react-toastify";

class RentBookComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            rentDaysNumber: ''
        }
        this.changeRentDaysNumber = this.changeRentDaysNumber.bind(this);
        this.rentBook= this.rentBook.bind(this);
    }

    rentBook = (e) => {
        e.preventDefault();
        let request = {
            tariffId: this.state.id,
            rentDaysNumber: this.state.rentDaysNumber
        };
        ReadReturnService.rentBook(request).then(res => {
            toast('Rented');
            this.props.history.push(`/${res.data.historyId}/subscribe-email-reminder`);
        });
    }

    changeRentDaysNumber= (event) => {
        this.setState({rentDaysNumber: event.target.value});
    }

    cancel(){
        this.props.history.push('/read-and-return-book-catalog');
    }

    render() {
        return (
            <div>
                <div className = "card w-50">
                    <h3 className = "text-center">Rent Book</h3>
                    <div className = "card-body">
                        <form>
                            <div className = "form-group">
                                <label> Rent days number: </label>
                                <input placeholder="days number" name="days" className="form-control"
                                       onChange={this.changeRentDaysNumber}/>
                            </div>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>
                            <button className="btn btn-success float-right" onClick={this.rentBook}>Rent</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default RentBookComponent