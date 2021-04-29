import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/read-return/';

class ReadReturnService {
    addToReadAndReturn(request) {
        return axios.post(API_URL , request,{ headers: authHeader() });
    }

    getReadReturnBooks(){
        return axios.get(API_URL, { headers: authHeader() });
    }

    updatePricePerDay(id, price){
        return axios.patch(API_URL + id + '/price-per-day', price,{ headers: authHeader() });
    }

    getRentedBooks(){
        return axios.get(API_URL + 'rented', { headers: authHeader() });
    }

    rentBook(request){
        return axios.post(API_URL + 'rent', request, { headers: authHeader() });
    }

    updateEmailReminding(id, emailReminding){
        return axios.patch(API_URL + id + '/email-reminding', emailReminding,{ headers: authHeader() });
    }
}

export default new ReadReturnService();
