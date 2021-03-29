import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/customer/top-selling-books.component";
import BookCatalog from "./components/customer/book-catalog.component"
import BookList from "./components/seller/books.component"
import AddBook from "./components/seller/add-book.component"
import EditBook from "./components/seller/edit-book.component"
import Orders from "./components/seller/orders.component"
import UpdateOrder from "./components/seller/update-order.component"
import OrderOfCurrentUser from "./components/customer/order-list.component"
import Cart from "./components/customer/cart.component"

import EditUser from "./components/admin/edit-user.component";
import AddUser from "./components/admin/add-user.component";
import UserList from "./components/admin/userlist.component";
import Login from "./components/login.component";
import Register from "./components/customer/register.component";
import AuthService from "./services/auth.service";

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
          <Link to={"/"} className="navbar-brand text-warning">
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
            <Route exact path={["/", "/home"]} component={Home}/>
            <Route exact path="/books" component={BookCatalog}/>
            <Route exact path="/book-list" component={BookList}/>
            <Route exact path="/add-book" component={AddBook}/>
            <Route path="/books/:id" component={EditBook}/>

            <Route exact path="/orders" component={Orders}/>
            <Route path="/orders/:id" component={UpdateOrder}/>
            <Route exact path="/my-orders" component={OrderOfCurrentUser}/>
            <Route exact path="/cart" component={Cart}/>

            <Route path="/users/:id" component={EditUser}/>
            <Route path="/users/:id/blocked" component={EditUser}/>
            <Route exact path="/add-user" component={AddUser}/>
            <Route exact path="/user-list" component={UserList}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
