import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/coupons/';

class CouponService {
    addCoupon(couponRequest) {
        return axios.post(API_URL , couponRequest,{ headers: authHeader() });
    }

    getCouponsForCurrentUser(){
        return axios.get(API_URL + "current-user", { headers: authHeader() });
    }
}

export default new CouponService();
