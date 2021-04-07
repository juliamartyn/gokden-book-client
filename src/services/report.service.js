import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/reports/';

class ReportService {

    generateReport(reportRequest){
        return axios.post(API_URL + "sold-books", reportRequest, { headers: authHeader() , responseType: "blob"});
    }

}

export default new ReportService();
