import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import { marketReducer as reducer } from "./reducers/marketReducer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import UserAccount from "./components/UserAccount";
import MenuBar from "./components/MenuBar";
import thunk from "redux-thunk";
import logger from "redux-logger";
import "./App.css";
import UserUpdateForm from "./components/UserUpdateForm";
//const store = createStore(reducer, applyMiddleware(thunk));
const store = createStore(reducer, applyMiddleware(thunk, logger));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MenuBar />

        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard/:id" component={Dashboard} />
          <PrivateRoute
            exact
            path="/users/:id/account"
            component={UserAccount}
          />
          <PrivateRoute
            exact
            path="/users/:id/account/update"
            component={UserUpdateForm}
          />
          <Route exact path="/" component={ProductList} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
