import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/emails/';

class EmailService {
    resendEmail(id) {
        return axios.post(API_URL + 'resend/' + id, null,{ headers: authHeader() });
    }

    getEmailHistory(pageNo){
        return axios.get(API_URL + pageNo, { headers: authHeader() });
    }
}

export default new EmailService();
