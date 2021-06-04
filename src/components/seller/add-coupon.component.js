import React, { Component } from 'react'
import UserService from '../../services/user.service';
import CouponService from '../../services/coupon.service';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class AddCouponComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            discount: '',
            dueDate: '',
            bookQuantity: '',
            customers: [],
            checkedCustomers: [],
            currentPage: 1,
            forAll: ''
        }
        this.createCoupon = this.createCoupon.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentDidMount(){
        this.findPageableUsers(this.state.currentPage);
    }

    findPageableUsers(page){
        page -= 1;
        UserService.getPageableUsers(page).then((response) => {
            let data = response.data;
            this.setState({
                customers: data.users,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.currentPage + 1
            })
        });
    }

    handleChangeDate(date) {
        this.setState({ dueDate: date })
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    createCoupon = (e) => {
        e.preventDefault();

        let couponRequest = {
            type: this.state.forAll === true ? "SHARED" : "PERSONAL",
            discount: this.state.discount,
            dueDate: this.state.dueDate,
            bookQuantity: this.state.bookQuantity,
            customersId: this.state.checkedCustomers
        }

        CouponService.addCoupon(couponRequest).then(res => {
            toast('Coupon applied');
        });
    };

    handleChange = (event) => {
        let itemId = event.target.value;

        if(event.target.checked === true){
            this.state.checkedCustomers.push(itemId);
            this.setState({ checkedCustomers: this.state.checkedCustomers });
        } else {
            let items = this.state.checkedCustomers.filter(item => item !== itemId);
            this.setState({ checkedCustomers: items });
        }
    }

    handleChangeForAll = (event) => {
        if(event.target.checked === true){
            this.setState({ forAll: true });
        } else {
            this.setState({ forAll: false });
        }
    }

    render() {
        return(
            <div>
                <h2 className="text-center mb-4">Create Coupon</h2>
                <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 25rem)", "justify-content": "center"}}>
                    <div>
                        <div className="form-group w-75">
                            <label>Discount %:</label>
                            <input placeholder="discount" name="discount" className="form-control" value={this.state.discount} onChange={this.onChange}/>
                        </div>

                        LIMIT BY
                        <div className="form-group w-75">
                            <hr style={{"border": "1px solid #ffc107"}}/>
                            <label>Books quantity :</label>
                            <input placeholder="book quantity" name="bookQuantity" className="form-control" value={this.state.bookQuantity} onChange={this.onChange}/>
                        </div>

                        <div className="form-group w-75">
                            <label>Due date (not including):</label>
                            <DatePicker placeholder="top to choose date" selected={ this.state.dueDate } onChange={this.handleChangeDate}
                                        dateFormat="MMMM d, yyyy"/>
                        </div>
                    </div>
                    <div>
                        CUSTOMERS
                        <hr style={{"border": "1px solid #ffc107"}}/>
                        {this.state.customers.map(customer =>
                            <label>
                                <input type="checkbox" value={customer.id} onChange={this.handleChange} key={customer.id}/>
                                {customer.username} - {customer.email}
                            </label>
                        )}

                        <div className="text-center">
                            <button className=" btn btn-outline-info" disabled={this.state.currentPage === 1}
                                    onClick={() => this.findPageableUsers(this.state.currentPage - 1)}> Prev </button>
                            <button className="btn btn-outline-info" disabled={this.state.currentPage === this.state.totalPages}
                                    onClick={() => this.findPageableUsers(this.state.currentPage + 1)}> Next </button>
                            <p>Page {this.state.currentPage} of {this.state.totalPages}</p>
                        </div>
                        <hr style={{"border": "1px solid #ffc107"}}/>
                        <label>
                            <input type="checkbox" onChange={this.handleChangeForAll}/>For all customers
                        </label>
                    </div>
                </div>
                <button className="btn btn-success float-right" onClick={this.createCoupon}>Apply</button>
            </div>
        );
    }
}

export default AddCouponComponent;