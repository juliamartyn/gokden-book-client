import React, { Component } from 'react'
import ReadReturnService from '../../../services/readreturn.service';

class UpdatePricePerDayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            pricePerDay: ''
        }
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.updatePricePerDay= this.updatePricePerDay.bind(this);
    }

    updatePricePerDay = (e) => {
        e.preventDefault();
        let price = {pricePerDay: this.state.pricePerDay};
        ReadReturnService.updatePricePerDay(this.state.id, price).then(res => {
            this.props.history.push('/read-and-return-books');
        });
    }

    changePriceHandler= (event) => {
        this.setState({pricePerDay: event.target.value});
    }

    cancel(){
        this.props.history.push('/read-and-return-books');
    }

    render() {
        return (
            <div>
                <div className = "card w-50">
                    <h3 className="text-center">Update Price per Day</h3>
                    <div className = "card-body">
                        <form>
                            <div className = "form-group">
                                <label> Price per day: </label>
                                <input placeholder="$" name="price" className="form-control" onChange={this.changePriceHandler}/>
                            </div>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Cancel</button>
                            <button className="btn btn-success float-right" onClick={this.updatePricePerDay}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdatePricePerDayComponent