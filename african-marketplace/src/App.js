import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import { marketReducer as reducer } from "./reducers/marketReducer";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import thunk from "redux-thunk";
import logger from "redux-logger";
import "./App.css";
const store = createStore(reducer, applyMiddleware(thunk, logger));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">Welcome to our African Marketplace!</div>

        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route path="/" component={Login} />
          <PrivateRoute path="/product-list" component={ProductList} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

//<Route path="/" component={Home} />
