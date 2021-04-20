import React from 'react';
import CouponService from './../../services/coupon.service';
import OrderService from './../../services/order.service';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class CouponsComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            orderId: this.props.match.params.id,
            coupons: []
        }
    }

    componentDidMount(){
        CouponService.getCouponsForCurrentUser().then((response) => {
            this.setState({ coupons: response.data})
        });
    }

    applyCoupon(couponId){
        OrderService.applyCoupon(this.state.orderId, couponId).then(response => {
            toast("Coupon applied");
            this.props.history.push('/cart');
        });
    }

    render (){
        return (
            <div>
                <h1 className="text-center mb-4"> Coupons</h1>
                <div style={{"display": "grid", "grid-template-columns": "repeat(auto-fit, 20rem)", "justify-content": "center"}}>
                    {this.state.coupons.map( coupon =>
                        <div className="card bg-warning text-center" style={{"width" : "18rem", "padding": "0px"}} key={coupon.id}>
                            <div className="card-body">
                                <h5 className="card-title">{coupon.discount} % OFF</h5>
                                {coupon.dueDate != null ? <p className="card-text">Expiration date - {coupon.dueDate}</p> :
                                    <p className="card-text">Books limit: {coupon.bookQuantity} pcs.</p>}
                            </div>
                            <button className="btn btn-dark" onClick={() => this.applyCoupon(coupon.id)}>Apply coupon</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default CouponsComponent