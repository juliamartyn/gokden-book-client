import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import EditUserDeliveryAddress from "./components/customer/edit-delivery-address.component"
import Profile from "./components/customer/profile.component"
import Home from "./components/customer/top-selling-books.component";
import BookCatalog from "./components/customer/book-catalog.component"
import BookList from "./components/seller/books.component";
import BookDetails from "./components/customer/book-details.component";
import AddBook from "./components/seller/add-book.component"
import EditBook from "./components/seller/edit-book.component"
import Orders from "./components/seller/orders.component"
import UpdateOrder from "./components/seller/update-order.component"
import SoldBooksReport from "./components/seller/report.component"
import Email from "./components/seller/email.component"
import Discount from "./components/seller/add-discount.component"
import AddCoupon from "./components/seller/add-coupon.component"
import Coupons from "./components/customer/coupons.component"
import AddEBook from "./components/seller/add-e-book.component";

import AddReadAndReturn from "./components/seller/readAndReturn/add-book-to-readreturn.component";
import ReadAndReturnList from "./components/seller/readAndReturn/readreturn-books-list.component";
import ReadAndReturnBooks from "./components/customer/readAndReturn/readreturn-books-list.component";
import ReadAndReturnRent from  "./components/customer/readAndReturn/rent-book.component";
import RentedBooks from "./components/seller/readAndReturn/readreturn-rented-books.component";
import UpdatePricePerDay from "./components/seller/readAndReturn/update-price-per-day.component";
import SubscribeEmailReminder from "./components/customer/readAndReturn/readreturn-subscribe-emailreminding.component";

import PreOrderOfCurrentUser from "./components/customer/pre-orders.component"
import OrderOfCurrentUser from "./components/customer/order-list.component"
import Cart from "./components/customer/cart.component"

import EditUser from "./components/admin/edit-user.component";
import AddUser from "./components/admin/add-user.component";
import UserList from "./components/admin/userlist.component";
import Login from "./components/login.component";
import Register from "./components/customer/register.component";
import AuthService from "./services/auth.service";

import DownloadEOrder from "./components/customer/download-e-order.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showSellerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showSellerBoard: user.roles.includes("ROLE_SELLER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showCustomerBoard: user.roles.includes("ROLE_CUSTOMER"),

      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
          <Link to={"/home"} className="navbar-brand text-warning">
           GoldenBook
          </Link>
          <div className="navbar-nav mr-auto">
            {this.state.showAdminBoard ? (
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/user-list"} className="nav-link">
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/book-list"} className="nav-link">
                      Books
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/orders"} className="nav-link">
                      Orders
                    </Link>
                  </li>
                </ul>
            ) : ''
            }

            {this.state.showSellerBoard ?(
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/book-list"} className="nav-link">
                      Books
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/orders"} className="nav-link">
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/report"} className="nav-link">
                      Reports
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/email"} className="nav-link">
                      Emails History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/read-and-return-books"} className="nav-link">
                      Read&Return
                    </Link>
                  </li>
                </ul>
            ) : ''
            }

            {this.state.showCustomerBoard ? (
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/books"} className="nav-link">
                      Books Catalog
                    </Link>
                  </li>
                  <li className="nav-item" >
                    <Link to={"/my-orders"} className="nav-link">
                      MyOrders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/cart"} className="nav-link">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/read-and-return-book-catalog"} className="nav-link">
                      Read&Return
                    </Link>
                  </li>
                </ul>
            ) : ''
            }
          </div>

          {this.state.currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item text-white-50 p-2">
                  Hello, {this.state.currentUser.username}
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path={["/", "/home"]} component={Home}/>
            <Route exact path="/books" component={BookCatalog}/>
            <Route exact path="/book-list" component={BookList}/>
            <Route path="/books/:id/details" component={BookDetails}/>
            <Route exact path="/add-book" component={AddBook}/>
            <Route path="/books/:id" component={EditBook}/>
            <Route exact path="/report" component={SoldBooksReport}/>
            <Route exact path="/email" component={Email}/>
            <Route exact path="/discount" component={Discount}/>
            <Route exact path="/add-coupon" component={AddCoupon}/>
            <Route exact path="/orders/:id/coupons" component={Coupons}/>
            <Route path="/add-e-book/books/:id" component={AddEBook}/>

            <Route path="/read-and-return/books/:id" component={AddReadAndReturn}/>
            <Route exact path="/read-and-return-books" component={ReadAndReturnList}/>
            <Route exact path="/read-and-return-books/:id" component={UpdatePricePerDay}/>
            <Route exact path="/read-and-return-book-catalog" component={ReadAndReturnBooks}/>
            <Route exact path="/read-and-return/rent/:id" component={ReadAndReturnRent}/>
            <Route exact path="/rented-books" component={RentedBooks}/>
            <Route exact path="/:id/subscribe-email-reminder" component={SubscribeEmailReminder}/>

            <Route exact path="/orders" component={Orders}/>
            <Route path="/orders/:id" component={UpdateOrder}/>
            <Route exact path="/my-orders" component={OrderOfCurrentUser}/>
            <Route exact path="/pre-orders" component={PreOrderOfCurrentUser}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/e-orders/download/:code" component={DownloadEOrder}/>

            <Route path="/users/:id/delivery-address" component={EditUserDeliveryAddress}/>
            <Route path="/users/:id" component={EditUser}/>
            <Route path="/users/:id/blocked" component={EditUser}/>
            <Route exact path="/add-user" component={AddUser}/>
            <Route exact path="/user-list" component={UserList}/>
            <Route exact path={["/", "/login"]} component={Login}/>
            <Route exact path="/register" component={Register}/>

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
