import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/orders/';

class OrderService {

    orderBook(bookId) {
        return axios.put(API_URL + "add-book/" + bookId, null, { headers: authHeader() });
    }

    getCart(){
        return axios.get(API_URL + "cart", { headers: authHeader() });
    }

    deleteBookFromCart(orderId, bookId){
        return axios.patch(API_URL + orderId + "/cart/delete-book/" + bookId, null,{ headers: authHeader() });
    }

    confirmOrder(id){
        return axios.patch(API_URL + id + "/confirm", null,{ headers: authHeader() });
    }

    getOrderList(){
        return axios.get(API_URL, { headers: authHeader() });
    }

    updateOrderStatus(id, status){
        return axios.patch(API_URL + id + "/status", status, { headers: authHeader() })
    }

    getOrderListForCurrentUser(){
        return axios.get(API_URL + "current-user", { headers: authHeader() });
    }

    preOrderBook(bookId){
        return axios.post(API_URL + "preorder-book/" + bookId, null, { headers: authHeader() });
    }

    getPreOrders(){
        return axios.get(API_URL + "pre-orders", { headers: authHeader() });
    }

    cancelPreOrder(orderId){
        return axios.delete(API_URL + orderId + "/cancel", { headers: authHeader() });
    }

    confirmPreOrder(orderId){
        return axios.patch(API_URL + "pre-orders/" + orderId + "/confirm", null, { headers: authHeader() });
    }
}

export default new OrderService();
