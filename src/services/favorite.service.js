import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/favorites/';

class FavoriteService {
    addToFavorite(request) {
        return axios.post(API_URL + 'add', request,{ headers: authHeader() });
    }
}

export default new FavoriteService();