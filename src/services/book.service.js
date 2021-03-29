import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/books/';

class BookService {

    getBookList() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    deleteBook(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

    addBook(book) {
        return axios.post(API_URL, book, { headers: authHeader() });
    }

    getBookById(bookId){
        return axios.get(API_URL + bookId, { headers: authHeader() });
    }

    updateBookPrice(id, book) {
        return axios.patch(API_URL + id + '/price', book, { headers: authHeader() });
    }

    updateBookQuantity(id, book) {
        return axios.patch(API_URL + id + '/quantity', book, { headers: authHeader() });
    }

    getTopBooksByCategory(category){
        return axios.get(API_URL + "top/" + category, { headers: authHeader() });
    }

}

export default new BookService();
