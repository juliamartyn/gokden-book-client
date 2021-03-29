import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users';

class UserService {

  getUserList() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  addUser(user) {
    return axios.post(API_URL, user);
  }

  getUserById(userId){
    return axios.get(API_URL + '/' + userId, { headers: authHeader() });
  }

  updateUser(id, user) {
    return axios.patch(API_URL + '/' + id + '/username', user, { headers: authHeader() });
  }

  updateUserDisabled(id, disabled) {
    return axios.patch(API_URL + '/' + + id + '/disabled', disabled, { headers: authHeader() });
  }

  updateDeliveryAddress(id, deliveryAddress) {
    return axios.patch(API_URL + '/' + id + '/delivery-address', deliveryAddress, { headers: authHeader() })
  }

}

export default new UserService();
